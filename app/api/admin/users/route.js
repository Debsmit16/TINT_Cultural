import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// Middleware to check admin access
async function checkAdmin() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return { error: 'Unauthorized', status: 401 };
  }
  
  if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
    return { error: 'Forbidden - Admin access required', status: 403 };
  }
  
  return { session };
}

// GET all users (admin)
export async function GET() {
  try {
    const adminCheck = await checkAdmin();
    if (adminCheck.error) {
      return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status });
    }

    const users = await prisma.user.findMany({
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
        createdAt: true,
        _count: {
          select: { registrations: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Admin get users error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
