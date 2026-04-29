import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
    
    const parsedOrders = orders.map(order => {
      let parsedItems = [];
      try {
        parsedItems = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
      } catch (e) {
        parsedItems = [];
      }
      return { ...order, items: parsedItems };
    });

    return NextResponse.json(parsedOrders);
  } catch (error) {
    console.error("Orders API Error:", error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // SERVER-SIDE STATUS CHECK
    const settings = await prisma.settings.findUnique({
      where: { id: 'restaurant_config' }
    });

    if (settings && !settings.isOpen && settings.mode !== 'auto') {
      return NextResponse.json({ error: 'Restaurant is currently CLOSED. Orders are disabled.' }, { status: 403 });
    }

    if (settings && settings.mode === 'auto') {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      const [openH, openM] = (settings.openTime || '09:00').split(':').map(Number);
      const [closeH, closeM] = (settings.closeTime || '02:00').split(':').map(Number);
      const openTotal = openH * 60 + openM;
      const closeTotal = closeH * 60 + closeM;

      let isWithinTime = false;
      if (openTotal < closeTotal) {
        isWithinTime = currentTime >= openTotal && currentTime < closeTotal;
      } else {
        isWithinTime = currentTime >= openTotal || currentTime < closeTotal;
      }

      if (!isWithinTime) {
        return NextResponse.json({ error: 'Restaurant is currently CLOSED. Orders are disabled.' }, { status: 403 });
      }
    }

    console.log(`[ORDER] Attempting new order...`);

    // Generate sequential ID: DT-00001, DT-00002, ...
    let nextOrderId: string;
    const lastOrder = await prisma.order.findFirst({
      where: { orderId: { startsWith: 'DT-' } },
      orderBy: { timestamp: 'desc' },
    });
    if (lastOrder?.orderId) {
      const lastNum = parseInt(lastOrder.orderId.replace('DT-', ''), 10);
      nextOrderId = `DT-${String((isNaN(lastNum) ? 0 : lastNum) + 1).padStart(5, '0')}`;
    } else {
      nextOrderId = 'DT-00001';
    }

    const newOrder = await prisma.order.create({
      data: {
        id: nextOrderId,
        orderId: nextOrderId,
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
    
    console.log(`[ORDER] Success: ${newOrder.id}`);
    return NextResponse.json({ success: true, order: newOrder });
  } catch (error: any) {
    console.error('Order creation failed:', error.message);
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
