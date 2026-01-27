import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET single event by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const event = await prisma.sport.findUnique({
      where: { id },
      include: { registrations: true },
    });

    if (!event) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      event: {
        ...event,
        registrationCount: event.registrations?.length || 0,
      }
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch event' }, { status: 500 });
  }
}

// PUT - Update event (Admin only)
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const data = await request.json();

    const updatedEvent = await prisma.sport.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        category: data.category,
        description: data.description,
        rules: data.rules,
        image: data.image,
        venue: data.venue,
        eventDate: data.eventDate,
        maxTeamSize: data.maxTeamSize,
        minTeamSize: data.minTeamSize,
        isTeamEvent: data.isTeamEvent,
        isGirlsOnly: data.isGirlsOnly,
        isActive: data.isActive,
        sortOrder: data.sortOrder,
      },
    });

    return NextResponse.json({ success: true, event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ success: false, error: 'Failed to update event' }, { status: 500 });
  }
}

// DELETE - Delete event (Admin only)
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Check if there are registrations
    const registrationCount = await prisma.registration.count({
      where: { sportId: id },
    });

    if (registrationCount > 0) {
      return NextResponse.json({ 
        success: false, 
        error: `Cannot delete event with ${registrationCount} registrations. Deactivate it instead.` 
      }, { status: 400 });
    }

    await prisma.sport.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete event' }, { status: 500 });
  }
}
