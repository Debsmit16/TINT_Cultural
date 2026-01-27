import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET all registrations (Admin: all, User: own)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const sportId = searchParams.get('sportId');
    const status = searchParams.get('status');
    const all = searchParams.get('all') === 'true';

    const where = {};
    
    // Regular users can only see their own registrations unless admin
    if (session.user.role !== 'ADMIN' || !all) {
      where.userId = session.user.id;
    }
    
    if (sportId) where.sportId = sportId;
    if (status) where.status = status;
    if (category) where.sport = { category };

    const registrations = await prisma.registration.findMany({
      where,
      include: {
        user: true,
        sport: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, registrations });
  } catch (error) {
    console.error('Get registrations error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

// POST create new registration
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Please login to register' }, { status: 401 });
    }

    const data = await request.json();

    if (!data.sportId) {
      return NextResponse.json({ success: false, error: 'Event selection is required' }, { status: 400 });
    }

    // Check if sport exists and is active
    const sport = await prisma.sport.findUnique({
      where: { id: data.sportId },
    });

    if (!sport) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }

    if (!sport.isActive) {
      return NextResponse.json({ success: false, error: 'This event is not accepting registrations' }, { status: 400 });
    }

    // Check for duplicate registration
    const existingRegs = await prisma.registration.findMany({
      where: {
        userId: session.user.id,
        sportId: data.sportId,
      },
    });

    if (existingRegs.length > 0) {
      return NextResponse.json({ success: false, error: 'You are already registered for this event' }, { status: 400 });
    }

    // Check category limits
    const userRegs = await prisma.registration.findMany({
      where: { userId: session.user.id },
      include: { sport: true },
    });

    const categoryCount = userRegs.filter(r => r.sport?.category === sport.category).length;
    
    const categoryLimits = {
      OUTDOOR: 1,
      ATHLETICS: 2,
      INDOOR: 2,
    };

    if (categoryCount >= (categoryLimits[sport.category] || 2)) {
      return NextResponse.json({ 
        success: false, 
        error: `You have reached the maximum limit for ${sport.category.toLowerCase()} events` 
      }, { status: 400 });
    }

    // Check girls-only restriction
    if (sport.isGirlsOnly && data.participantGender !== 'Female') {
      return NextResponse.json({ success: false, error: 'This event is only for girls' }, { status: 400 });
    }

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        userId: session.user.id,
        sportId: data.sportId,
        teamName: data.teamName,
        participantName: data.participantName || session.user.name,
        participantPhone: data.participantPhone,
        participantDept: data.participantDept,
        participantYear: data.participantYear,
        participantRollNo: data.participantRollNo,
        participantGender: data.participantGender,
        captainName: data.captainName,
        viceCaptainName: data.viceCaptainName,
        goalkeeperName: data.goalkeeperName,
        idProofPath: data.idProofPath,
        teamListPath: data.teamListPath,
        status: 'PENDING',
        paymentStatus: 'PENDING',
      },
    });

    // Get full registration with sport details
    const fullRegistration = await prisma.registration.findUnique({
      where: { id: registration.id },
      include: { sport: true, user: true },
    });

    return NextResponse.json({ 
      success: true, 
      registration: fullRegistration,
      message: `Registration successful! Your TASO ID is ${registration.tasoId}`
    }, { status: 201 });
  } catch (error) {
    console.error('Create registration error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
