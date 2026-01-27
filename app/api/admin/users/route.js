import { getServerSession } from 'next-auth/next';
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

    const users = prisma.user.findMany();
    const registrations = prisma.registration.findMany();

    // Add registration count and format response
    const usersWithCounts = users
      .map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        college: user.college,
        department: user.department,
        year: user.year,
        rollNumber: user.rollNumber,
        role: user.role,
        gender: user.gender,
        createdAt: user.createdAt,
        _count: {
          registrations: registrations.filter(r => r.userId === user.id).length,
        },
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return NextResponse.json(usersWithCounts);
  } catch (error) {
    console.error('Admin get users error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
