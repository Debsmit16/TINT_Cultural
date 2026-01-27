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

// GET all registrations (admin)
export async function GET(request) {
  try {
    const adminCheck = await checkAdmin();
    if (adminCheck.error) {
      return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status });
    }

    const { searchParams } = new URL(request.url);
    const sportId = searchParams.get('sportId');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    let registrations = prisma.registration.findMany();
    const users = prisma.user.findMany();
    const sports = prisma.sport.findMany();

    // Apply filters
    if (sportId) {
      registrations = registrations.filter(r => r.sportId === sportId);
    }
    if (status) {
      registrations = registrations.filter(r => r.status === status);
    }
    if (category) {
      const categorySports = sports.filter(s => s.category === category).map(s => s.id);
      registrations = registrations.filter(r => categorySports.includes(r.sportId));
    }

    const total = registrations.length;

    // Sort by createdAt descending
    registrations = registrations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const startIndex = (page - 1) * limit;
    registrations = registrations.slice(startIndex, startIndex + limit);

    // Add user and sport details
    const registrationsWithDetails = registrations.map(reg => {
      const user = users.find(u => u.id === reg.userId);
      const sport = sports.find(s => s.id === reg.sportId);
      return {
        ...reg,
        user: user ? {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          college: user.college,
          department: user.department,
          year: user.year,
          rollNumber: user.rollNumber,
          gender: user.gender,
        } : null,
        sport: sport || null,
      };
    });

    return NextResponse.json({
      registrations: registrationsWithDetails,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Admin get registrations error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
