import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    return NextResponse.json({
      success: true,
      message: 'Successfully connected to the database!',
      userCount,
      databaseUrlEnvExists: !!process.env.DATABASE_URL,
      databaseUrlEnvValueStart: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 20) + '...' : 'none'
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack,
      databaseUrlEnvExists: !!process.env.DATABASE_URL,
      databaseUrlEnvValueStart: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 20) + '...' : 'none'
    }, { status: 500 });
  }
}
