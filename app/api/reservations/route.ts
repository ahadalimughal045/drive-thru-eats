import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const res = await prisma.reservation.findMany();
    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const res = await prisma.reservation.create({
      data: {
        tableId: data.tableId,
        name: data.name,
        phone: data.phone,
        date: data.date,
        time: data.time,
        guests: data.guests
      }
    });
    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
