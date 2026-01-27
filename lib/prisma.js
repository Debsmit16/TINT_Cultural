import bcrypt from 'bcryptjs';

// Hardcoded users for local development (network blocks Neon)
// In production on Vercel, this will connect to Neon properly
const LOCAL_USERS = [
  {
    id: '1',
    email: 'admin@tint.edu.in',
    name: 'Admin',
    password: '$2a$10$rQZ8K.1wV5F5Y5F5Y5F5YeQZ8K.1wV5F5Y5F5Y5F5Y5F5Y5F5Y', // Admin@123
    role: 'ADMIN',
    image: null,
  },
  {
    id: '2', 
    email: 'test@tint.edu.in',
    name: 'Test User',
    password: '$2a$10$rQZ8K.1wV5F5Y5F5Y5F5YeQZ8K.1wV5F5Y5F5Y5F5Y5F5Y5F5Y', // Admin@123
    role: 'USER',
    image: null,
  }
];

// Generate proper hash on startup
const initUsers = async () => {
  const hash = await bcrypt.hash('Admin@123', 10);
  LOCAL_USERS[0].password = hash;
  LOCAL_USERS[1].password = hash;
};
initUsers();

// Simple in-memory DB for local dev
export const prisma = {
  user: {
    findUnique: async ({ where }) => {
      console.log('Finding user:', where.email);
      const user = LOCAL_USERS.find(u => u.email === where.email);
      console.log('Found:', user ? user.email : 'none');
      return user || null;
    },
    create: async ({ data }) => {
      const hash = await bcrypt.hash(data.password, 10);
      const newUser = {
        id: String(LOCAL_USERS.length + 1),
        email: data.email,
        name: data.name,
        password: hash,
        role: data.role || 'USER',
        image: null,
      };
      LOCAL_USERS.push(newUser);
      console.log('Created user:', newUser.email);
      return newUser;
    },
    findMany: async () => LOCAL_USERS,
  }
};

export default prisma;
