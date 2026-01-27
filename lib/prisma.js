import bcrypt from 'bcryptjs';

// ============ IN-MEMORY DATABASE ============
// This is used for both local development and production demo
// For a real production deployment with persistent data, 
// you would need to set up a proper database (Neon, Supabase, etc.)
// and migrate this to use real Prisma client

// Note: Data resets on server restart - this is intentional for demo

// ---- USERS ----
const LOCAL_USERS = [
  {
    id: '1',
    email: 'admin@tint.edu.in',
    name: 'Admin',
    password: '', // Will be set on init
    role: 'ADMIN',
    image: null,
    phone: '9876543210',
    department: 'Administration',
    year: 'Faculty Member / Non-teaching staff member',
    rollNumber: 'ADMIN001',
    gender: 'Male',
  },
  {
    id: '2', 
    email: 'test@tint.edu.in',
    name: 'Test User',
    password: '', // Will be set on init
    role: 'USER',
    image: null,
    phone: '9876543211',
    department: 'CSE',
    year: '3rd',
    rollNumber: '12345678',
    gender: 'Male',
  }
];

// ---- SPORTS/EVENTS ----
const LOCAL_SPORTS = [
  // Outdoor Events
  { id: 'cricket_boys', name: 'Cricket (Boys)', slug: 'cricket-boys', category: 'OUTDOOR', isTeamEvent: true, maxTeamSize: 11, minTeamSize: 8, isGirlsOnly: false, isActive: true, venue: 'NKDA Ground, Newtown', eventDate: '6th & 7th Feb 2026', sortOrder: 1 },
  { id: 'cricket_girls', name: 'Cricket (Girls)', slug: 'cricket-girls', category: 'OUTDOOR', isTeamEvent: true, maxTeamSize: 8, minTeamSize: 8, isGirlsOnly: true, isActive: true, venue: 'NKDA Ground, Newtown', eventDate: '6th & 7th Feb 2026', sortOrder: 2 },
  { id: 'football_boys', name: 'Football (Boys)', slug: 'football-boys', category: 'OUTDOOR', isTeamEvent: true, maxTeamSize: 10, minTeamSize: 7, isGirlsOnly: false, isActive: true, venue: 'NKDA Ground, Newtown', eventDate: '6th & 7th Feb 2026', sortOrder: 3 },
  // Athletics Events
  { id: '100m', name: '100 Metres', slug: '100-metres', category: 'ATHLETICS', isTeamEvent: false, maxTeamSize: 1, minTeamSize: 1, isGirlsOnly: false, isActive: true, venue: 'NKDA Ground, Newtown', eventDate: '5th Feb 2026', sortOrder: 4 },
  { id: '400m', name: '400 Metres', slug: '400-metres', category: 'ATHLETICS', isTeamEvent: false, maxTeamSize: 1, minTeamSize: 1, isGirlsOnly: false, isActive: true, venue: 'NKDA Ground, Newtown', eventDate: '5th Feb 2026', sortOrder: 5 },
  { id: 'shotput', name: 'Shot Put', slug: 'shot-put', category: 'ATHLETICS', isTeamEvent: false, maxTeamSize: 1, minTeamSize: 1, isGirlsOnly: false, isActive: true, venue: 'NKDA Ground, Newtown', eventDate: '5th Feb 2026', sortOrder: 6 },
  { id: 'relay', name: 'Relay Race (4x100m)', slug: 'relay-race', category: 'ATHLETICS', isTeamEvent: true, maxTeamSize: 4, minTeamSize: 4, isGirlsOnly: false, isActive: true, venue: 'NKDA Ground, Newtown', eventDate: '5th Feb 2026', sortOrder: 7 },
  { id: 'hit_wicket', name: 'Hit the Wicket', slug: 'hit-the-wicket', category: 'ATHLETICS', isTeamEvent: false, maxTeamSize: 1, minTeamSize: 1, isGirlsOnly: true, isActive: true, venue: 'NKDA Ground, Newtown', eventDate: '5th Feb 2026', sortOrder: 8 },
  { id: 'tug_of_war', name: 'Tug of War', slug: 'tug-of-war', category: 'ATHLETICS', isTeamEvent: true, maxTeamSize: 8, minTeamSize: 8, isGirlsOnly: false, isActive: true, venue: 'NKDA Ground, Newtown', eventDate: '5th Feb 2026', sortOrder: 9 },
  // Indoor Events
  { id: 'chess', name: 'Chess', slug: 'chess', category: 'INDOOR', isTeamEvent: false, maxTeamSize: 1, minTeamSize: 1, isGirlsOnly: false, isActive: true, venue: 'College Premises', eventDate: '5th & 6th Feb 2026', sortOrder: 10 },
  { id: 'carrom', name: 'Carrom', slug: 'carrom', category: 'INDOOR', isTeamEvent: false, maxTeamSize: 1, minTeamSize: 1, isGirlsOnly: false, isActive: true, venue: 'College Premises', eventDate: '5th & 6th Feb 2026', sortOrder: 11 },
  { id: 'table_tennis', name: 'Table Tennis', slug: 'table-tennis', category: 'INDOOR', isTeamEvent: false, maxTeamSize: 1, minTeamSize: 1, isGirlsOnly: false, isActive: true, venue: 'College Premises', eventDate: '5th & 6th Feb 2026', sortOrder: 12 },
  { id: 'badminton', name: 'Badminton (Girls)', slug: 'badminton-girls', category: 'INDOOR', isTeamEvent: false, maxTeamSize: 1, minTeamSize: 1, isGirlsOnly: true, isActive: true, venue: 'College Premises', eventDate: '5th & 6th Feb 2026', sortOrder: 13 },
];

// ---- REGISTRATIONS ----
const LOCAL_REGISTRATIONS = [];
let TASO_COUNTER = 0; // Will be incremented for each registration

// Generate TASO ID
function generateTasoId() {
  TASO_COUNTER++;
  const paddedNum = String(TASO_COUNTER).padStart(6, '0');
  return `TASOTINT2K26#${paddedNum}`;
}

// Initialize passwords on startup
const initUsers = async () => {
  const hash = await bcrypt.hash('Admin@123', 10);
  LOCAL_USERS[0].password = hash;
  LOCAL_USERS[1].password = hash;
};
initUsers();

// ============ IN-MEMORY PRISMA-LIKE CLIENT ============
const inMemoryPrisma = {
  // ---- USER OPERATIONS ----
  user: {
    findUnique: async ({ where, include }) => {
      const user = LOCAL_USERS.find(u => 
        (where.email && u.email === where.email) || 
        (where.id && u.id === where.id)
      );
      if (!user) return null;
      
      if (include?.registrations) {
        const regs = LOCAL_REGISTRATIONS.filter(r => r.userId === user.id);
        return { ...user, registrations: regs.map(r => ({
          ...r,
          sport: LOCAL_SPORTS.find(s => s.id === r.sportId)
        })) };
      }
      return user;
    },
    findMany: async ({ where, include } = {}) => {
      let users = [...LOCAL_USERS];
      if (where?.role) {
        users = users.filter(u => u.role === where.role);
      }
      if (include?.registrations) {
        return users.map(u => ({
          ...u,
          registrations: LOCAL_REGISTRATIONS.filter(r => r.userId === u.id)
        }));
      }
      return users;
    },
    create: async ({ data }) => {
      const hash = data.password ? await bcrypt.hash(data.password, 10) : null;
      const newUser = {
        id: String(LOCAL_USERS.length + 1),
        email: data.email,
        name: data.name,
        password: hash,
        role: data.role || 'USER',
        image: null,
        phone: data.phone || null,
        department: data.department || null,
        year: data.year || null,
        rollNumber: data.rollNumber || null,
        gender: data.gender || null,
      };
      LOCAL_USERS.push(newUser);
      return newUser;
    },
    update: async ({ where, data }) => {
      const idx = LOCAL_USERS.findIndex(u => u.id === where.id || u.email === where.email);
      if (idx === -1) return null;
      LOCAL_USERS[idx] = { ...LOCAL_USERS[idx], ...data };
      return LOCAL_USERS[idx];
    },
    delete: async ({ where }) => {
      const idx = LOCAL_USERS.findIndex(u => u.id === where.id);
      if (idx === -1) return null;
      const deleted = LOCAL_USERS.splice(idx, 1)[0];
      return deleted;
    },
    count: async ({ where } = {}) => {
      let users = LOCAL_USERS;
      if (where?.role) users = users.filter(u => u.role === where.role);
      return users.length;
    },
  },

  // ---- SPORT OPERATIONS ----
  sport: {
    findUnique: async ({ where, include }) => {
      const sport = LOCAL_SPORTS.find(s => 
        (where.id && s.id === where.id) || 
        (where.slug && s.slug === where.slug)
      );
      if (!sport) return null;
      
      if (include?.registrations) {
        const regs = LOCAL_REGISTRATIONS.filter(r => r.sportId === sport.id);
        return { ...sport, registrations: regs };
      }
      return sport;
    },
    findMany: async ({ where, orderBy, include } = {}) => {
      let sports = [...LOCAL_SPORTS];
      
      if (where?.category) {
        sports = sports.filter(s => s.category === where.category);
      }
      if (where?.isActive !== undefined) {
        sports = sports.filter(s => s.isActive === where.isActive);
      }
      
      if (orderBy?.sortOrder) {
        sports.sort((a, b) => orderBy.sortOrder === 'asc' ? a.sortOrder - b.sortOrder : b.sortOrder - a.sortOrder);
      }
      
      if (include?.registrations) {
        return sports.map(s => ({
          ...s,
          registrations: LOCAL_REGISTRATIONS.filter(r => r.sportId === s.id),
          _count: { registrations: LOCAL_REGISTRATIONS.filter(r => r.sportId === s.id).length }
        }));
      }
      
      return sports;
    },
    create: async ({ data }) => {
      const newSport = {
        id: data.id || `sport_${Date.now()}`,
        name: data.name,
        slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, ''),
        category: data.category,
        description: data.description || null,
        rules: data.rules || null,
        image: data.image || null,
        venue: data.venue || null,
        eventDate: data.eventDate || null,
        maxTeamSize: data.maxTeamSize || 1,
        minTeamSize: data.minTeamSize || 1,
        isTeamEvent: data.isTeamEvent || false,
        isGirlsOnly: data.isGirlsOnly || false,
        isActive: data.isActive !== undefined ? data.isActive : true,
        sortOrder: data.sortOrder || LOCAL_SPORTS.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      LOCAL_SPORTS.push(newSport);
      return newSport;
    },
    update: async ({ where, data }) => {
      const idx = LOCAL_SPORTS.findIndex(s => s.id === where.id);
      if (idx === -1) return null;
      LOCAL_SPORTS[idx] = { ...LOCAL_SPORTS[idx], ...data, updatedAt: new Date() };
      return LOCAL_SPORTS[idx];
    },
    delete: async ({ where }) => {
      const idx = LOCAL_SPORTS.findIndex(s => s.id === where.id);
      if (idx === -1) return null;
      const deleted = LOCAL_SPORTS.splice(idx, 1)[0];
      return deleted;
    },
    count: async ({ where } = {}) => {
      let sports = LOCAL_SPORTS;
      if (where?.category) sports = sports.filter(s => s.category === where.category);
      if (where?.isActive !== undefined) sports = sports.filter(s => s.isActive === where.isActive);
      return sports.length;
    },
  },

  // ---- REGISTRATION OPERATIONS ----
  registration: {
    findUnique: async ({ where, include }) => {
      const reg = LOCAL_REGISTRATIONS.find(r => 
        (where.id && r.id === where.id) || 
        (where.tasoId && r.tasoId === where.tasoId)
      );
      if (!reg) return null;
      
      const result = { ...reg };
      if (include?.user) {
        result.user = LOCAL_USERS.find(u => u.id === reg.userId);
      }
      if (include?.sport) {
        result.sport = LOCAL_SPORTS.find(s => s.id === reg.sportId);
      }
      return result;
    },
    findMany: async ({ where, include, orderBy } = {}) => {
      let regs = [...LOCAL_REGISTRATIONS];
      
      if (where?.userId) {
        regs = regs.filter(r => r.userId === where.userId);
      }
      if (where?.sportId) {
        regs = regs.filter(r => r.sportId === where.sportId);
      }
      if (where?.status) {
        regs = regs.filter(r => r.status === where.status);
      }
      if (where?.sport?.category) {
        const sportIds = LOCAL_SPORTS.filter(s => s.category === where.sport.category).map(s => s.id);
        regs = regs.filter(r => sportIds.includes(r.sportId));
      }
      
      if (orderBy?.createdAt) {
        regs.sort((a, b) => orderBy.createdAt === 'desc' 
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt)
        );
      }
      
      if (include) {
        regs = regs.map(r => {
          const result = { ...r };
          if (include.user) result.user = LOCAL_USERS.find(u => u.id === r.userId);
          if (include.sport) result.sport = LOCAL_SPORTS.find(s => s.id === r.sportId);
          return result;
        });
      }
      
      return regs;
    },
    create: async ({ data }) => {
      const tasoId = generateTasoId();
      const newReg = {
        id: `reg_${Date.now()}`,
        tasoId,
        tasoNumber: TASO_COUNTER,
        userId: data.userId,
        sportId: data.sportId,
        teamName: data.teamName || null,
        status: data.status || 'PENDING',
        participantName: data.participantName || null,
        participantPhone: data.participantPhone || null,
        participantDept: data.participantDept || null,
        participantYear: data.participantYear || null,
        participantRollNo: data.participantRollNo || null,
        participantGender: data.participantGender || null,
        captainName: data.captainName || null,
        viceCaptainName: data.viceCaptainName || null,
        goalkeeperName: data.goalkeeperName || null,
        idProofPath: data.idProofPath || null,
        teamListPath: data.teamListPath || null,
        paymentStatus: data.paymentStatus || 'PENDING',
        transactionId: data.transactionId || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      LOCAL_REGISTRATIONS.push(newReg);
      return newReg;
    },
    update: async ({ where, data }) => {
      const idx = LOCAL_REGISTRATIONS.findIndex(r => r.id === where.id || r.tasoId === where.tasoId);
      if (idx === -1) return null;
      LOCAL_REGISTRATIONS[idx] = { ...LOCAL_REGISTRATIONS[idx], ...data, updatedAt: new Date() };
      return LOCAL_REGISTRATIONS[idx];
    },
    delete: async ({ where }) => {
      const idx = LOCAL_REGISTRATIONS.findIndex(r => r.id === where.id);
      if (idx === -1) return null;
      const deleted = LOCAL_REGISTRATIONS.splice(idx, 1)[0];
      return deleted;
    },
    count: async ({ where } = {}) => {
      let regs = LOCAL_REGISTRATIONS;
      if (where?.userId) regs = regs.filter(r => r.userId === where.userId);
      if (where?.sportId) regs = regs.filter(r => r.sportId === where.sportId);
      if (where?.status) regs = regs.filter(r => r.status === where.status);
      return regs.length;
    },
  },

  // ---- TEAM MEMBER OPERATIONS (for team sports) ----
  teamMember: {
    findMany: async ({ where } = {}) => {
      // Simplified - would need separate array for full implementation
      return [];
    },
    create: async ({ data }) => {
      return data;
    },
    createMany: async ({ data }) => {
      return { count: data.length };
    },
  },
};

export default inMemoryPrisma;
export { inMemoryPrisma as prisma };
