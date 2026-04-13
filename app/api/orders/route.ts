import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 1000;

    const where: any = {};
    if (status) where.status = status;
    
    // If no status provided, usually we only want active/recent orders for the dashboard
    if (!status) {
      where.OR = [
        { status: { notIn: ['Delivered', 'Cancelled'] } },
        { timestamp: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } } // Or last 24h
      ];
    }

    const orders = await prisma.order.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: limit
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Orders API Error:", error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const LOG_FILE = path.join(process.cwd(), 'data', 'order_error.log');
  if (!fs.existsSync(path.join(process.cwd(), 'data'))) fs.mkdirSync(path.join(process.cwd(), 'data'));

  try {
    const data = await req.json();
    fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ATTEMPTING ORDER: ${JSON.stringify(data.id || 'new')}\n`);

    const newOrder = await prisma.order.create({
      data: {
        id: data.id || `ORD-${Date.now()}`,
        orderId: data.id || `ORD-${Date.now()}`,
        customerName: data.customerName,
        email: data.email || null,
        phone: data.phone,
        type: data.type,
        tableNumber: data.tableNumber ? String(data.tableNumber) : null,
        deliveryArea: data.deliveryArea || null,
        address: data.address || null,
        instructions: data.instructions || null,
        paymentMethod: data.paymentMethod,
        transactionNumber: data.transactionNumber || null,
        total: parseFloat(data.total),
        status: data.status || 'Pending',
        chef: data.chef || null,
        waiter: data.waiter || null,
        items: typeof data.items === 'string' ? data.items : JSON.stringify(data.items),
      }
    });
    
    fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] SUCCESS ORDER: ${newOrder.id}\n`);
    return NextResponse.json({ success: true, order: newOrder });
  } catch (error: any) {
    const errorMsg = `[${new Date().toISOString()}] ORDER FAILED: ${error.message}\n${error.stack}\n`;
    fs.appendFileSync(LOG_FILE, errorMsg);
    console.error('Order creation failed:', error);
    return NextResponse.json({ error: 'Failed to create order', detail: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, updates } = await req.json();
    await prisma.order.update({
      where: { orderId: id },
      data: updates
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.order.delete({
      where: { orderId: id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
