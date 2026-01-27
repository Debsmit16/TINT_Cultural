// Production Database Client using Prisma with Neon
import { PrismaClient } from '@prisma/client';
import { neonConfig, Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

// Enable WebSocket for Neon in serverless environments
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis;

let prismaClient;

// Check if we should use real database (production) or in-memory (local dev)
const useRealDatabase = process.env.NODE_ENV === 'production' || process.env.USE_REAL_DB === 'true';

if (useRealDatabase && process.env.DATABASE_URL) {
  // Production: Use real Prisma with Neon
  if (!globalForPrisma.prisma) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaNeon(pool);
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  prismaClient = globalForPrisma.prisma;
} else {
  // Local dev: Will use in-memory from prisma.js
  prismaClient = null;
}

export { prismaClient };
export const isUsingRealDB = useRealDatabase && !!prismaClient;
