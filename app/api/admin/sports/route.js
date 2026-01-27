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

    const sports = prisma.sport.findMany();
    const registrations = prisma.registration.findMany();

    // Add registration count to each sport
    const sportsWithCount = sports.map(sport => ({
      ...sport,
      _count: {
        registrations: registrations.filter(r => r.sportId === sport.id).length
      }
    })).sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json(sportsWithCount);
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
    const { name, slug, category, description, rules, image, maxTeamSize, minTeamSize, venue, eventDate, isTeamEvent, isGirlsOnly, isActive } = body;

    if (!name || !slug || !category) {
      return NextResponse.json(
        { error: 'Name, slug, and category are required' },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existing = prisma.sport.findFirst({ slug });
    if (existing) {
      return NextResponse.json(
        { error: 'Sport with this slug already exists' },
        { status: 400 }
      );
    }

    const sport = prisma.sport.create({
      name,
      slug,
      category,
      description: description || '',
      rules: rules || '',
      image: image || '',
      maxTeamSize: maxTeamSize || 1,
      minTeamSize: minTeamSize || 1,
      venue: venue || '',
      eventDate: eventDate || null,
      isTeamEvent: isTeamEvent || false,
      isGirlsOnly: isGirlsOnly || false,
      isActive: isActive !== false,
    });

    return NextResponse.json(sport, { status: 201 });
  } catch (error) {
    console.error('Admin create sport error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
