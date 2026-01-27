const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const sports = [
  // Outdoor Events
  { name: 'Cricket (Boys)', slug: 'cricket-boys', category: 'OUTDOOR', isTeamEvent: true, maxTeamSize: 11, minTeamSize: 8, isGirlsOnly: false, venue: 'NKDA Ground, Newtown', eventDate: '6th & 7th Feb 2026', sortOrder: 1 },
  { name: 'Cricket (Girls)', slug: 'cricket-girls', category: 'OUTDOOR', isTeamEvent: true, maxTeamSize: 8, minTeamSize: 8, isGirlsOnly: true, venue: 'NKDA Ground, Newtown', eventDate: '6th & 7th Feb 2026', sortOrder: 2 },
  { name: 'Football (Boys)', slug: 'football-boys', category: 'OUTDOOR', isTeamEvent: true, maxTeamSize: 10, minTeamSize: 7, isGirlsOnly: false, venue: 'NKDA Ground, Newtown', eventDate: '6th & 7th Feb 2026', sortOrder: 3 },
  // Athletics Events
  { name: '100 Metres', slug: '100-metres', category: 'ATHLETICS', isTeamEvent: false, maxTeamSize: 1, minTeamSize: 1, isGirlsOnly: false, venue: 'NKDA Ground, Newtown', eventDate: '5th Feb 2026', sortOrder: 4 },
  { name: '400 Metres', slug: '400-metres', category: 'ATHLETICS', isTeamEvent: false, maxTeamSize: 1, minTeamSize: 1, isGirlsOnly: false, venue: 'NKDA Ground, Newtown', eventDate: '5th Feb 2026', sortOrder: 5 },
  { name: 'Shot Put', slug: 'shot-put', category: 'ATHLETICS', isTeamEvent: false, maxTeamSize: 1, minTeamSize: 1, isGirlsOnly: false, venue: 'NKDA Ground, Newtown', eventDate: '5th Feb 2026', sortOrder: 6 },
  { name: 'Relay Race (4x100m)', slug: 'relay-race', category: 'ATHLETICS', isTeamEvent: true, maxTeamSize: 4, minTeamSize: 4, isGirlsOnly: false, venue: 'NKDA Ground, Newtown', eventDate: '5th Feb 2026', sortOrder: 7 },
  { name: 'Hit the Wicket', slug: 'hit-the-wicket', category: 'ATHLETICS', isTeamEvent: false, maxTeamSize: 1, minTeamSize: 1, isGirlsOnly: true, venue: 'NKDA Ground, Newtown', eventDate: '5th Feb 2026', sortOrder: 8 },
  { name: 'Tug of War', slug: 'tug-of-war', category: 'ATHLETICS', isTeamEvent: true, maxTeamSize: 8, minTeamSize: 8, isGirlsOnly: false, venue: 'NKDA Ground, Newtown', eventDate: '5th Feb 2026', sortOrder: 9 },
  // Indoor Events
  { name: 'Chess', slug: 'chess', category: 'INDOOR', isTeamEvent: false, maxTeamSize: 1, minTeamSize: 1, isGirlsOnly: false, venue: 'College Premises', eventDate: '5th & 6th Feb 2026', sortOrder: 10 },
  { name: 'Carrom', slug: 'carrom', category: 'INDOOR', isTeamEvent: false, maxTeamSize: 1, minTeamSize: 1, isGirlsOnly: false, venue: 'College Premises', eventDate: '5th & 6th Feb 2026', sortOrder: 11 },
  { name: 'Table Tennis', slug: 'table-tennis', category: 'INDOOR', isTeamEvent: false, maxTeamSize: 1, minTeamSize: 1, isGirlsOnly: false, venue: 'College Premises', eventDate: '5th & 6th Feb 2026', sortOrder: 12 },
  { name: 'Badminton (Girls)', slug: 'badminton-girls', category: 'INDOOR', isTeamEvent: false, maxTeamSize: 1, minTeamSize: 1, isGirlsOnly: true, venue: 'College Premises', eventDate: '5th & 6th Feb 2026', sortOrder: 13 },
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tint.edu.in' },
    update: {},
    create: {
      email: 'admin@tint.edu.in',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
      phone: '9876543210',
      department: 'Administration',
      year: 'Faculty Member',
      rollNumber: 'ADMIN001',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create test user
  const testPassword = await bcrypt.hash('Admin@123', 10);
  const testUser = await prisma.user.upsert({
    where: { email: 'test@tint.edu.in' },
    update: {},
    create: {
      email: 'test@tint.edu.in',
      name: 'Test User',
      password: testPassword,
      role: 'USER',
      phone: '9876543211',
      department: 'CSE',
      year: '3rd',
      rollNumber: '12345678',
    },
  });
  console.log('✅ Test user created:', testUser.email);

  // Create sports
  for (const sport of sports) {
    await prisma.sport.upsert({
      where: { slug: sport.slug },
      update: sport,
      create: sport,
    });
  }
  console.log(`✅ ${sports.length} sports created/updated`);

  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
