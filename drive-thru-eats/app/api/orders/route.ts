import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { timestamp: 'desc' }
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newOrder = await prisma.order.create({
      data: {
        orderId: data.id,
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        type: data.type,
        tableNumber: data.tableNumber,
        deliveryArea: data.deliveryArea,
        address: data.address,
        instructions: data.instructions,
        paymentMethod: data.paymentMethod,
        transactionNumber: data.transactionNumber,
        total: parseFloat(data.total),
        status: data.status,
        chef: data.chef,
        waiter: data.waiter,
        items: data.items, // Prisma stores this as JSON in MySQL
      }
    });
    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
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
