# Prompt 04 — Backend Prisma Refactor

## Context

Read the project documentation:

- docs/spec.md
- docs/api.md
- docs/architecture.md

Inspect the current backend implementation.

The backend is currently implemented with:

- Node.js
- Express
- TypeScript
- SQLite

The current backend already works and must not be rewritten from scratch.

The goal is to refactor the persistence layer so that favorites are managed through Prisma ORM, while keeping the existing API behavior stable.

The application should remain ready for a future migration from SQLite to PostgreSQL.

---

## Task

Refactor the backend to use Prisma ORM for favorites persistence.

---

## Constraints

- modify backend files only
- do not modify frontend files
- do not rewrite the entire backend
- preserve the existing API routes and behavior
- keep the current CommonJS TypeScript setup
- keep video filesystem logic unchanged
- introduce a repository layer for database access
- Prisma must use SQLite for now
- structure the code so future PostgreSQL migration is easier

---

## Expected Output

Implement the following changes:

1. Add Prisma to the backend project
2. Create a Prisma schema file:
   - prisma/schema.prisma
3. Configure Prisma to use SQLite through `DATABASE_URL`
4. Add a Prisma client file:
   - src/db/prisma.ts
5. Add a repository layer:
   - src/repositories/favoriteRepository.ts
6. Refactor `favoriteService.ts` to use the repository instead of direct SQLite access
7. Remove or stop using direct SQLite access for favorites
8. Keep existing routes working:
   - GET /api/favorites
   - POST /api/favorites
   - DELETE /api/favorites/:id
9. Keep all video-related filesystem logic unchanged
10. Update environment configuration to use:
    - DATABASE_URL

Example Prisma model:

model Favorite {
id Int @id @default(autoincrement())
videoPath String @unique
createdAt DateTime @default(now())
}

Suggested backend structure:

backend/
prisma/
schema.prisma
src/
db/
prisma.ts
repositories/
favoriteRepository.ts
services/
favoriteService.ts
routes/
favorites.ts
videos.ts
server.ts

---

## Validation

Ensure:

- backend compiles successfully
- backend starts without errors
- Prisma client is generated correctly
- favorites endpoints still work
- no frontend files are changed
- the code is ready for a future migration from SQLite to PostgreSQL
