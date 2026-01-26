# TINT Cultural & Sports Web Platform

A fullstack web application for managing TINT's cultural and sports festivals - **Exuberance** (Sports), **Prabuddha** (Tech), and **Yagvik** (Cultural).

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?logo=prisma)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🎯 Overview

TINTWeb serves as the central platform for TINT's annual festivals, providing:

- **User Authentication** - Secure login/registration with NextAuth.js
- **Sports Registration** - Team and individual event registration for Exuberance
- **Admin Dashboard** - Comprehensive management panel for organizers
- **Event Galleries** - Photo galleries from past events
- **Responsive Design** - Mobile-first, accessible UI

## 🏗️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Frontend** | React 18, Framer Motion |
| **Authentication** | NextAuth.js v4 |
| **Database** | PostgreSQL (Neon Serverless) |
| **ORM** | Prisma 6 |
| **Styling** | CSS Modules |
| **Deployment** | Vercel |

## 📁 Project Structure

```
├── app/
│   ├── admin/              # Admin panel (dashboard, sports, registrations, users)
│   ├── api/                # API routes
│   │   ├── auth/           # NextAuth & registration endpoints
│   │   ├── admin/          # Admin-only endpoints
│   │   ├── sports/         # Public sports listing
│   │   ├── registrations/  # User registration management
│   │   └── user/           # User profile endpoints
│   ├── auth/               # Login & register pages
│   ├── components/         # Shared React components
│   ├── exuberance/         # Sports fest pages
│   │   ├── activities/     # Individual sport details
│   │   ├── committee/      # Organizing committee
│   │   ├── contact/        # Contact information
│   │   └── gallery/        # Photo gallery
│   ├── prabuddha/          # Tech fest (Coming Soon)
│   ├── yagvik/             # Cultural fest (Coming Soon)
│   ├── globals.css         # Global styles
│   ├── layout.js           # Root layout
│   └── page.js             # Landing page
├── lib/
│   ├── auth.js             # NextAuth configuration
│   └── prisma.js           # Prisma client singleton
├── prisma/
│   └── schema.prisma       # Database schema
├── public/                 # Static assets (images, fonts, icons)
└── scripts/                # Build utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- PostgreSQL database (we recommend [Neon](https://neon.tech))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Debsmit16/TINT_Cultural.git
   cd TINT_Cultural
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL="postgresql://..."      # Neon pooled connection
   DIRECT_URL="postgresql://..."        # Neon direct connection
   NEXTAUTH_SECRET="your-secret-key"    # Generate: openssl rand -base64 32
   NEXTAUTH_URL="http://localhost:3000" # Your app URL
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Database Schema

### Core Models

- **User** - Authentication & profile data with role-based access (USER, ADMIN, SUPER_ADMIN)
- **Sport** - Event definitions with categories (INDOOR, OUTDOOR, ESPORTS, ATHLETICS)
- **Registration** - User-sport registrations with status tracking
- **TeamMember** - Team composition for group events

### Entity Relationship

```
User ─────┬──── Registration ────── Sport
          │           │
          │     TeamMember
          │
     Account/Session (NextAuth)
```

## 🔐 Authentication

The application uses NextAuth.js with credentials provider:

- **Password Hashing**: bcryptjs with 12 salt rounds
- **Session Strategy**: JWT tokens
- **Role-Based Access**: USER, ADMIN, SUPER_ADMIN levels
- **Protected Routes**: Admin panel requires ADMIN or higher role

## 📡 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sports` | List all active sports |
| POST | `/api/auth/register` | User registration |

### Protected (Authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/PUT | `/api/user` | Get/update user profile |
| GET/POST | `/api/registrations` | User's registrations |
| DELETE | `/api/registrations/[id]` | Cancel registration |

### Admin Only
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Dashboard statistics |
| GET/POST | `/api/admin/sports` | Manage sports |
| PATCH/DELETE | `/api/admin/sports/[id]` | Update/delete sport |
| GET | `/api/admin/registrations` | All registrations |
| PATCH | `/api/admin/registrations/[id]` | Approve/reject |
| GET | `/api/admin/users` | List all users |

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma database GUI |
| `npx prisma migrate dev` | Run database migrations |

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Add environment variables in Vercel project settings
4. Deploy!

### Environment Variables for Production

```env
DATABASE_URL="your-neon-pooled-connection-string"
DIRECT_URL="your-neon-direct-connection-string"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Developed and maintained by the TINT Web Development Team.

---

<p align="center">
  Made with ❤️ for TINT
</p>
