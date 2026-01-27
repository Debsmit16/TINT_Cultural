import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET single registration
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const registration = await prisma.registration.findUnique({
      where: { id: params.id },
      include: {
        sport: true,
        teamMembers: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            college: true,
          },
        },
      },
    });

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    // Check if user owns this registration or is admin
    if (registration.userId !== session.user.id && session.user.role === 'USER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(registration);
  } catch (error) {
    console.error('Get registration error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// DELETE registration (cancel)
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const registration = await prisma.registration.findUnique({
      where: { id: params.id },
    });

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    // Check if user owns this registration or is admin
    if (registration.userId !== session.user.id && session.user.role === 'USER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.registration.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    console.error('Delete registration error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
