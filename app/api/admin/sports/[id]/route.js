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

// GET single sport (admin)
export async function GET(request, { params }) {
  try {
    const adminCheck = await checkAdmin();
    if (adminCheck.error) {
      return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status });
    }

    const sport = await prisma.sport.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    });

    if (!sport) {
      return NextResponse.json({ error: 'Sport not found' }, { status: 404 });
    }

    return NextResponse.json(sport);
  } catch (error) {
    console.error('Admin get sport error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// PATCH update sport (admin)
export async function PATCH(request, { params }) {
  try {
    const adminCheck = await checkAdmin();
    if (adminCheck.error) {
      return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status });
    }

    const body = await request.json();
    const { name, slug, category, description, rules, image, maxTeamSize, minTeamSize, isActive } = body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (category !== undefined) updateData.category = category;
    if (description !== undefined) updateData.description = description;
    if (rules !== undefined) updateData.rules = rules;
    if (image !== undefined) updateData.image = image;
    if (maxTeamSize !== undefined) updateData.maxTeamSize = maxTeamSize;
    if (minTeamSize !== undefined) updateData.minTeamSize = minTeamSize;
    if (isActive !== undefined) updateData.isActive = isActive;

    const sport = await prisma.sport.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(sport);
  } catch (error) {
    console.error('Admin update sport error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Sport with this name or slug already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// DELETE sport (admin)
export async function DELETE(request, { params }) {
  try {
    const adminCheck = await checkAdmin();
    if (adminCheck.error) {
      return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status });
    }

    await prisma.sport.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Sport deleted successfully' });
  } catch (error) {
    console.error('Admin delete sport error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
