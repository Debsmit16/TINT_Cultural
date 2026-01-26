import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all sports
export async function GET() {
  try {
    const sports = await prisma.sport.findMany({
      where: { isActive: true },
      orderBy: { category: 'asc' },
    });

    return NextResponse.json(sports);
  } catch (error) {
    console.error('Get sports error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
