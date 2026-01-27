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

// GET dashboard stats
export async function GET() {
  try {
    const adminCheck = await checkAdmin();
    if (adminCheck.error) {
      return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status });
    }

    const [
      totalUsers,
      totalRegistrations,
      totalSports,
      pendingRegistrations,
      approvedRegistrations,
      registrationsByStatus,
      registrationsBySport,
      recentRegistrations,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.registration.count(),
      prisma.sport.count(),
      prisma.registration.count({ where: { status: 'PENDING' } }),
      prisma.registration.count({ where: { status: 'APPROVED' } }),
      prisma.registration.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      prisma.registration.groupBy({
        by: ['sportId'],
        _count: { sportId: true },
      }),
      prisma.registration.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, email: true },
          },
          sport: {
            select: { name: true },
          },
        },
      }),
    ]);

    // Get sport names for the chart
    const sportIds = registrationsBySport.map((r) => r.sportId);
    const sports = await prisma.sport.findMany({
      where: { id: { in: sportIds } },
      select: { id: true, name: true },
    });

    const sportMap = Object.fromEntries(sports.map((s) => [s.id, s.name]));
    const registrationsBySportWithNames = registrationsBySport.map((r) => ({
      sport: sportMap[r.sportId] || 'Unknown',
      count: r._count.sportId,
    }));

    return NextResponse.json({
      stats: {
        totalUsers,
        totalRegistrations,
        totalSports,
        pendingRegistrations,
        approvedRegistrations,
      },
      registrationsByStatus,
      registrationsBySport: registrationsBySportWithNames,
      recentRegistrations,
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
