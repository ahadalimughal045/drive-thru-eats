import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    const user = await prisma.user.findUnique({ 
      where: { email } 
    });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ 
      success: true, 
      user: { name: user.name, email: user.email } 
    });
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ 
      error: 'Login failed', 
      detail: error.message 
    }, { status: 500 });
  }
}
