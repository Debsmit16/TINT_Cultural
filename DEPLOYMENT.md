# 🚀 TINT Cultural - Deployment Guide

## Quick Deploy to Vercel (with Neon DB Free Tier)

### Step 1: Set Up Neon Database (Free Tier)

1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Sign up/Login with GitHub
3. Create a new project (e.g., "tint-cultural")
4. Copy your connection string from the dashboard

Your connection strings will look like:
```
DATABASE_URL="postgresql://user:password@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://user:password@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require"
```

### Step 2: Deploy to Vercel

1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add these Environment Variables in Vercel:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Neon connection string |
| `DIRECT_URL` | Your Neon connection string |
| `NEXTAUTH_SECRET` | Generate with: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` |

5. Click **Deploy**

The build command will automatically:
- Generate Prisma Client
- Push database schema to Neon
- Build the Next.js app

### Step 3: Seed the Database (First Time Only)

After first deployment, you need to seed the initial data. You can do this:

**Option A: Using Vercel Console**
1. Go to your project in Vercel
2. Navigate to Settings → Functions
3. Open the terminal and run:
```bash
npx prisma db seed
```

**Option B: From Any Computer (outside college network)**
```bash
# Set your Neon DATABASE_URL
export DATABASE_URL="your-neon-connection-string"
npx prisma db seed
```

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection URL | `postgresql://...` |
| `DIRECT_URL` | Direct database URL (same as above for Neon) | `postgresql://...` |
| `NEXTAUTH_SECRET` | Secret for JWT encryption | Generate new for production |
| `NEXTAUTH_URL` | Your app's public URL | `https://tint-cultural.vercel.app` |
| `USE_REAL_DB` | Force real DB in development | `true` (optional) |

---

## Default Login Credentials

After seeding, you can login with:

**Admin Account:**
- Email: `admin@tint.edu.in`
- Password: `Admin@123`

**Test User Account:**
- Email: `test@tint.edu.in`
- Password: `Admin@123`

⚠️ **IMPORTANT:** Change these passwords in production!

---

## Local Development

The app automatically uses **in-memory database** for local development (since college network blocks Neon's port 5432).

To use real Neon DB locally (requires VPN or external network):
```bash
# Add to .env
USE_REAL_DB="true"
```

---

## Database Commands

```bash
# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed

# Open Prisma Studio (visual DB editor)
npm run db:studio

# Create migration
npm run db:migrate

# Reset database
npm run db:reset
```

---

## Production Features

✅ **Persistent Data** - All registrations stored in Neon PostgreSQL  
✅ **Auto-generated TASO IDs** - Format: `TASOTINT2K26#000001`  
✅ **Image Uploads** - ID proofs & team lists (max 3MB)  
✅ **Admin Dashboard** - Manage sports, users, registrations  
✅ **User Dashboard** - Register for events, download ID cards  
✅ **Role-based Access** - USER and ADMIN roles  

---

## File Storage Note

Currently, uploaded images are stored in `public/uploads/`. On Vercel's serverless platform, these files may not persist across deployments.

For production with many uploads, consider:
- **Cloudinary** (free tier available)
- **AWS S3**
- **Vercel Blob Storage**

---

## Support

For issues, check:
1. Vercel deployment logs
2. Neon dashboard for database status
3. Browser console for client-side errors

