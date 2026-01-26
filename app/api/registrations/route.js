import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET all registrations for current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const registrations = await prisma.registration.findMany({
      where: { userId: session.user.id },
      include: {
        sport: true,
        teamMembers: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(registrations);
  } catch (error) {
    console.error('Get registrations error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// POST create new registration
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { sportId, teamName, teamMembers } = body;

    if (!sportId) {
      return NextResponse.json({ error: 'Sport ID is required' }, { status: 400 });
    }

    // Check if sport exists
    const sport = await prisma.sport.findUnique({
      where: { id: sportId },
    });

    if (!sport) {
      return NextResponse.json({ error: 'Sport not found' }, { status: 404 });
    }

    // Check if user already registered for this sport
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        userId_sportId: {
          userId: session.user.id,
          sportId,
        },
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: 'You are already registered for this sport' },
        { status: 400 }
      );
    }

    // Create registration with team members
    const registration = await prisma.registration.create({
      data: {
        userId: session.user.id,
        sportId,
        teamName: teamName || null,
        teamMembers: teamMembers?.length
          ? {
              create: teamMembers.map((member) => ({
                name: member.name,
                email: member.email || null,
                phone: member.phone || null,
                college: member.college || null,
              })),
            }
          : undefined,
      },
      include: {
        sport: true,
        teamMembers: true,
      },
    });

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error('Create registration error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
