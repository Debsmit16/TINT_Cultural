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

// GET single sport (admin)
export async function GET(request, { params }) {
  try {
    const adminCheck = await checkAdmin();
    if (adminCheck.error) {
      return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status });
    }

    const { id } = await params;
    const sport = prisma.sport.findUnique(id);
    const registrations = prisma.registration.findMany();

    if (!sport) {
      return NextResponse.json({ error: 'Sport not found' }, { status: 404 });
    }

    // Add registration count
    const sportWithCount = {
      ...sport,
      _count: {
        registrations: registrations.filter(r => r.sportId === sport.id).length
      }
    };

    return NextResponse.json(sportWithCount);
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

    const { id } = await params;
    const body = await request.json();
    const { name, slug, category, description, rules, image, maxTeamSize, minTeamSize, isActive, venue, eventDate, isTeamEvent, isGirlsOnly } = body;

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
    if (venue !== undefined) updateData.venue = venue;
    if (eventDate !== undefined) updateData.eventDate = eventDate;
    if (isTeamEvent !== undefined) updateData.isTeamEvent = isTeamEvent;
    if (isGirlsOnly !== undefined) updateData.isGirlsOnly = isGirlsOnly;

    const sport = prisma.sport.update(id, updateData);

    if (!sport) {
      return NextResponse.json({ error: 'Sport not found' }, { status: 404 });
    }

    return NextResponse.json(sport);
  } catch (error) {
    console.error('Admin update sport error:', error);
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

    const { id } = await params;
    
    // Check if sport has registrations
    const registrations = prisma.registration.findMany();
    const hasRegistrations = registrations.some(r => r.sportId === id);
    
    if (hasRegistrations) {
      return NextResponse.json(
        { error: 'Cannot delete sport with existing registrations. Delete registrations first.' },
        { status: 400 }
      );
    }

    const deleted = prisma.sport.delete(id);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Sport not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Sport deleted successfully' });
  } catch (error) {
    console.error('Admin delete sport error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
