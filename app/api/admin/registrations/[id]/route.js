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

// GET single registration (admin)
export async function GET(request, { params }) {
  try {
    const adminCheck = await checkAdmin();
    if (adminCheck.error) {
      return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status });
    }

    const registration = await prisma.registration.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            college: true,
            department: true,
            year: true,
            rollNumber: true,
          },
        },
        sport: true,
        teamMembers: true,
      },
    });

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json(registration);
  } catch (error) {
    console.error('Admin get registration error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// PATCH update registration status (admin)
export async function PATCH(request, { params }) {
  try {
    const adminCheck = await checkAdmin();
    if (adminCheck.error) {
      return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status });
    }

    const body = await request.json();
    const { status, paymentStatus } = body;

    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const registration = await prisma.registration.update({
      where: { id: params.id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        sport: true,
        teamMembers: true,
      },
    });

    return NextResponse.json(registration);
  } catch (error) {
    console.error('Admin update registration error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// DELETE registration (admin)
export async function DELETE(request, { params }) {
  try {
    const adminCheck = await checkAdmin();
    if (adminCheck.error) {
      return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status });
    }

    await prisma.registration.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    console.error('Admin delete registration error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
