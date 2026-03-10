# Video Archive Web Application

Web application to browse and manage video files stored on a Ubuntu server.

The application allows users to search videos by time range, play them directly in the browser, download files and mark videos as favorites.

---

# Architecture

The system is composed of two parts:

Frontend:

- React
- TypeScript
- Vite
- fetch API

Backend:

- Node.js
- Express
- SQLite

Runtime environment:

- Ubuntu server
- PM2 process manager

More details can be found in:

docs/spec.md

---

# Features

Main features:

- search videos by time range
- play videos in browser
- download videos
- mark videos as favorites
- quickly access the latest video

Future features:

- user login
- operation logging
- system settings

---

# Project Structure

project-root
│
├── docs
│ └── spec.md
│
├── frontend
│
├── backend
│
├── README.md
│
└── .env.example

---

# Environment Variables

Create a `.env` file based on `.env.example`.

Example configuration:
PORT=3000
VIDEO_BASE_PATH=/data/videos
DATABASE_URL="file:./data/videos.db"

## Future versions of the application may use PostgreSQL without major code changes thanks to Prisma.

# Running the Backend

Install dependencies:
npm install

Run development server:

npm run dev

Build project:

npm run build

Start server:

npm run start

---

# Running with PM2

Start backend using PM2:5. Server Entry Point Changes (src/server.ts)
Replace initializeDatabase() import from sqlite
Add Prisma client initialization
Ensure Prisma schema is generated before startup
Add graceful shutdown handling 6. Dependencies (package.json)
Add:

Add to devDependencies:

7. Environment Configuration
   Update .env.example: Change DB_PATH=./data/videos.db → DATABASE_URL="file:./data/videos.db"
   SQLite connection string format uses prefix
   API Compatibility
   All existing routes remain 100% compatible:

✅ GET /api/favorites - Returns list of favorites (format unchanged)
✅ POST /api/favorites - Creates favorite (returns 201 with favorite object)
✅ DELETE /api/favorites/:id - Deletes favorite (returns 204)
Error responses, status codes, and response formats are all preserved.

Key Design Decisions
Repository Pattern: Provides abstraction layer between service and database, making it easier to switch databases later
Singleton Prisma Client: Reuses connection pool, follows Prisma best practices
No Breaking Changes: Routes and API contract remain identical
Type Safety: Prisma generates TypeScript types from schema automatically
Future-Proof: SQLite connection string format works with both SQLite and PostgreSQL drivers
Implementation Order
Install Prisma dependencies
Create Prisma schema
Create Prisma client file
Create repository layer
Refactor service layer
Update server initialization
Update environment configuration
Test all endpoints return same responses

pm2 start dist/server.js --name video-app

Save configuration:

pm2 save

Enable startup on reboot:

pm2 startup

---

# Frontend Development

Start development server:

npm run dev

Build production version:

npm run build

---

# Acceptance Criteria

The application should allow:

- searching videos by time range
- playing videos in browser
- downloading videos
- adding and removing favorites
- accessing the latest video

---

# Documentation

Technical specification:

docs/spec.md

---

# Future Improvements

Possible future extensions:

- authentication system
- user management
- operation logging
- video indexing
- live streaming support

# Details

For implementation details follow the specification in docs/spec.md.
