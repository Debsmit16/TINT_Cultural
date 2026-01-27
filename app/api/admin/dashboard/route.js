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

    // Get all data from in-memory database
    const users = prisma.user.findMany();
    const sports = prisma.sport.findMany();
    const registrations = prisma.registration.findMany();

    // Calculate stats
    const totalUsers = users.length;
    const totalSports = sports.length;
    const totalRegistrations = registrations.length;
    const pendingRegistrations = registrations.filter(r => r.status === 'PENDING').length;
    const approvedRegistrations = registrations.filter(r => r.status === 'APPROVED').length;

    // Group by status
    const registrationsByStatus = ['PENDING', 'APPROVED', 'REJECTED'].map(status => ({
      status,
      _count: { status: registrations.filter(r => r.status === status).length }
    }));

    // Group by sport
    const sportCounts = {};
    registrations.forEach(reg => {
      sportCounts[reg.sportId] = (sportCounts[reg.sportId] || 0) + 1;
    });
    
    const registrationsBySportWithNames = Object.entries(sportCounts).map(([sportId, count]) => {
      const sport = sports.find(s => s.id === sportId);
      return {
        sport: sport?.name || 'Unknown',
        count
      };
    });

    // Recent registrations with user and sport details
    const recentRegistrations = registrations
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10)
      .map(reg => {
        const user = users.find(u => u.id === reg.userId);
        const sport = sports.find(s => s.id === reg.sportId);
        return {
          ...reg,
          user: user ? { name: user.name, email: user.email } : null,
          sport: sport ? { name: sport.name } : null
        };
      });

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
