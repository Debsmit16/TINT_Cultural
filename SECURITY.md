# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT** open a public GitHub issue
2. Email the security concern to the maintainers
3. Include detailed steps to reproduce the vulnerability
4. Allow reasonable time for a fix before public disclosure

## Security Best Practices

This project implements the following security measures:

### Authentication
- Password hashing with bcryptjs (12 salt rounds)
- JWT-based session management
- Role-based access control (RBAC)

### API Security
- Server-side session validation
- Input validation on all endpoints
- Protected admin routes

### Data Protection
- Environment variables for sensitive data
- Database connection pooling
- Parameterized queries via Prisma (SQL injection prevention)

## Environment Variables

Never commit sensitive data. Required secrets:

- `DATABASE_URL` - Database connection string
- `DIRECT_URL` - Direct database connection
- `NEXTAUTH_SECRET` - JWT signing secret
- `NEXTAUTH_URL` - Application URL

Generate a secure secret:
```bash
openssl rand -base64 32
```
