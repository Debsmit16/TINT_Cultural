# Contributing to TINTWeb

Thank you for your interest in contributing to TINTWeb! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Set up the development environment (see README.md)
4. Create a new branch for your feature/fix

## Development Workflow

### Branch Naming

Use descriptive branch names:
- `feature/add-payment-integration`
- `fix/registration-validation`
- `docs/update-api-docs`
- `refactor/auth-module`

### Code Style

- Use meaningful variable and function names
- Write self-documenting code with comments where necessary
- Follow existing code patterns and conventions
- Use CSS Modules for component styling
- Keep components small and focused

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Formatting, missing semicolons, etc.
- `refactor` - Code change that neither fixes a bug nor adds a feature
- `perf` - Performance improvement
- `test` - Adding or correcting tests
- `chore` - Updating build tasks, package manager configs, etc.

**Examples:**
```
feat(auth): add password reset functionality
fix(registration): validate team size before submission
docs(api): add endpoint documentation for sports
```

## Pull Request Process

1. Update the README.md if your changes affect setup or usage
2. Update documentation for any API changes
3. Ensure all tests pass (when available)
4. Run `npm run lint` and fix any issues
5. Request review from maintainers

### PR Title Format

Follow the same convention as commit messages:
```
feat(scope): brief description of changes
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
```

## Project Structure Guidelines

### Adding New Pages

Place new pages in the appropriate directory under `app/`:
- Festival pages → `app/[festival-name]/`
- Auth pages → `app/auth/`
- Admin pages → `app/admin/`

### Adding New API Routes

1. Create route handlers in `app/api/`
2. Follow REST conventions
3. Add proper error handling
4. Validate input data
5. Check authentication/authorization

### Adding New Components

1. Create in `app/components/` for shared components
2. Create in page directory for page-specific components
3. Use CSS Modules for styling (`.module.css`)
4. Export as named export

## Database Changes

1. Modify `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name descriptive-name`
3. Update any affected API routes
4. Document schema changes in PR

## Questions?

Open an issue for any questions about contributing.
