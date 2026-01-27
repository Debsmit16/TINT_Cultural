import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET all events (public)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const activeOnly = searchParams.get('active') !== 'false';

    const where = {};
    if (category) where.category = category;
    if (activeOnly) where.isActive = true;

    const sports = await prisma.sport.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
      include: { registrations: true },
    });

    // Add registration count
    const eventsWithCount = sports.map(sport => ({
      ...sport,
      registrationCount: sport.registrations?.length || 0,
    }));

    return NextResponse.json({ success: true, events: eventsWithCount });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST - Create new event (Admin only)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.category) {
      return NextResponse.json({ success: false, error: 'Name and category are required' }, { status: 400 });
    }

    // Generate slug from name
    const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');

    const newEvent = await prisma.sport.create({
      data: {
        name: data.name,
        slug,
        category: data.category,
        description: data.description,
        rules: data.rules,
        image: data.image,
        venue: data.venue,
        eventDate: data.eventDate,
        maxTeamSize: data.maxTeamSize || 1,
        minTeamSize: data.minTeamSize || 1,
        isTeamEvent: data.isTeamEvent || false,
        isGirlsOnly: data.isGirlsOnly || false,
        isActive: data.isActive !== undefined ? data.isActive : true,
        sortOrder: data.sortOrder || 0,
      },
    });

    return NextResponse.json({ success: true, event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ success: false, error: 'Failed to create event' }, { status: 500 });
  }
}
