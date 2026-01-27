import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET current user profile
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        college: true,
        department: true,
        year: true,
        rollNumber: true,
        role: true,
        image: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// UPDATE user profile
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, phone, college, department, year, rollNumber } = body;

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        phone,
        college,
        department,
        year,
        rollNumber,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        college: true,
        department: true,
        year: true,
        rollNumber: true,
        role: true,
        image: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
