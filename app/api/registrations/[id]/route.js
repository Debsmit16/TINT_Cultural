import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET single registration
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const registration = await prisma.registration.findUnique({
      where: { id: params.id },
      include: {
        sport: true,
        user: true,
      },
    });

    if (!registration) {
      return NextResponse.json({ success: false, error: 'Registration not found' }, { status: 404 });
    }

    // Check if user owns this registration or is admin
    if (registration.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ success: true, registration });
  } catch (error) {
    console.error('Get registration error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

// PUT - Update registration (Admin only for status changes)
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const registration = await prisma.registration.findUnique({
      where: { id: params.id },
    });

    if (!registration) {
      return NextResponse.json({ success: false, error: 'Registration not found' }, { status: 404 });
    }

    // Only admin can update status
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();

    const updatedReg = await prisma.registration.update({
      where: { id: params.id },
      data: {
        status: data.status,
        paymentStatus: data.paymentStatus,
        transactionId: data.transactionId,
      },
    });

    return NextResponse.json({ success: true, registration: updatedReg });
  } catch (error) {
    console.error('Update registration error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

// DELETE registration (cancel)
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const registration = await prisma.registration.findUnique({
      where: { id: params.id },
    });

    if (!registration) {
      return NextResponse.json({ success: false, error: 'Registration not found' }, { status: 404 });
    }

    // Check if user owns this registration or is admin
    if (registration.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    await prisma.registration.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: 'Registration cancelled successfully' });
  } catch (error) {
    console.error('Delete registration error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
