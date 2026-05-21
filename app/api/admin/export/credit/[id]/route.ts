import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseAdminSessionValue } from '@/lib/admin-session';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
import * as XLSX from 'xlsx';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('dte_admin_session')?.value;
    const session = parseAdminSessionValue(sessionCookie);
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { id } = params;

    // Find the reference credit order to get customer phone/name
    const refOrder = await prisma.order.findUnique({
      where: { orderId: id }
    });

    if (!refOrder) {
      return new Response('Reference order not found', { status: 404 });
    }

    const customerPhone = refOrder.credit_phone || refOrder.phone;
    const customerName = refOrder.credit_customer_name || refOrder.customerName;
    const companyName = refOrder.credit_company_name || 'N/A';

    // Fetch all credit orders for this customer (cleared or pending, including deleted-from-view ones)
    const creditOrders = await prisma.order.findMany({
      where: {
        payment_type: 'credit',
        OR: [
          { credit_phone: customerPhone },
          { phone: customerPhone }
        ]
      },
      orderBy: { timestamp: 'desc' }
    });

    // Prepare Customer Info Metadata rows
    const customerInfo = [
      { A: 'Customer Name:', B: customerName },
      { A: 'Company Name:', B: companyName },
      { A: 'Phone Number:', B: customerPhone },
      { A: 'Total Orders:', B: creditOrders.length },
      { A: 'Total Credit:', B: creditOrders.reduce((sum, o) => sum + o.total, 0) },
      { A: 'Pending Credit:', B: creditOrders.filter(o => o.credit_status !== 'cleared').reduce((sum, o) => sum + o.total, 0) },
      { A: 'Cleared Credit:', B: creditOrders.filter(o => o.credit_status === 'cleared').reduce((sum, o) => sum + o.total, 0) },
      { A: '', B: '' } // blank spacer row
    ];

    // Prepare history table data
    const historyRows = creditOrders.map((co, index) => {
      let itemsStr = '';
      try {
        const items = typeof co.items === 'string' ? JSON.parse(co.items) : co.items;
        itemsStr = Array.isArray(items)
          ? items.map((it: any) => `${it.quantity}x ${it.name}`).join(', ')
          : '';
      } catch {
        itemsStr = 'Error parsing items';
      }

      const dateObj = new Date(co.timestamp);
      const date = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const time = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

      return {
        'S.No': index + 1,
        'Order ID': co.orderId,
        'Date': date,
        'Time': time,
        'Items Ordered': itemsStr,
        'Total Amount (INR)': co.total,
        'Status': co.credit_status?.toUpperCase() || 'PENDING'
      };
    });

    const workbook = XLSX.utils.book_new();

    // Convert metadata array
    const worksheet = XLSX.utils.json_to_sheet(customerInfo, { skipHeader: true });
    
    // Append table headers and rows starting from row 10 (index 9)
    XLSX.utils.sheet_add_json(worksheet, historyRows, { origin: 'A10' });

    // Set column widths
    worksheet['!cols'] = [
      { wch: 18 }, // A: S.No or Info Key
      { wch: 18 }, // B: Order ID or Info Val
      { wch: 15 }, // C: Date
      { wch: 15 }, // D: Time
      { wch: 50 }, // E: Items Ordered
      { wch: 20 }, // F: Total Amount
      { wch: 15 }, // G: Status
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Credit History');

    const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    const safeName = customerName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return new Response(buf, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="credit_${safeName}_history.xlsx"`
      }
    });
  } catch (error: any) {
    console.error("Export credit history error:", error);
    return new Response('Failed to export history: ' + error.message, { status: 500 });
  }
}
