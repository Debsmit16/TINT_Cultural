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

    const { id } = await params;
    const registration = prisma.registration.findUnique(id);
    
    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    // Add user and sport details
    const users = prisma.user.findMany();
    const sports = prisma.sport.findMany();
    const user = users.find(u => u.id === registration.userId);
    const sport = sports.find(s => s.id === registration.sportId);

    return NextResponse.json({
      ...registration,
      user: user ? {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        college: user.college,
        department: user.department,
        year: user.year,
        rollNumber: user.rollNumber,
        gender: user.gender,
      } : null,
      sport: sport || null,
    });
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

    const { id } = await params;
    const body = await request.json();
    const { status, paymentStatus } = body;

    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const registration = prisma.registration.update(id, updateData);

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    // Add user and sport details
    const users = prisma.user.findMany();
    const sports = prisma.sport.findMany();
    const user = users.find(u => u.id === registration.userId);
    const sport = sports.find(s => s.id === registration.sportId);

    return NextResponse.json({
      success: true,
      registration: {
        ...registration,
        user: user ? { id: user.id, name: user.name, email: user.email } : null,
        sport: sport || null,
      },
    });
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

    const { id } = await params;
    const deleted = prisma.registration.delete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Registration deleted successfully' });
  } catch (error) {
    console.error('Admin delete registration error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
