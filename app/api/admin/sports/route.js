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

// GET all sports (admin)
export async function GET() {
  try {
    const adminCheck = await checkAdmin();
    if (adminCheck.error) {
      return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status });
    }

    const sports = await prisma.sport.findMany({
      include: {
        _count: {
          select: { registrations: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(sports);
  } catch (error) {
    console.error('Admin get sports error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// POST create new sport (admin)
export async function POST(request) {
  try {
    const adminCheck = await checkAdmin();
    if (adminCheck.error) {
      return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status });
    }

    const body = await request.json();
    const { name, slug, category, description, rules, image, maxTeamSize, minTeamSize } = body;

    if (!name || !slug || !category) {
      return NextResponse.json(
        { error: 'Name, slug, and category are required' },
        { status: 400 }
      );
    }

    const sport = await prisma.sport.create({
      data: {
        name,
        slug,
        category,
        description,
        rules,
        image,
        maxTeamSize: maxTeamSize || 1,
        minTeamSize: minTeamSize || 1,
      },
    });

    return NextResponse.json(sport, { status: 201 });
  } catch (error) {
    console.error('Admin create sport error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Sport with this name or slug already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
