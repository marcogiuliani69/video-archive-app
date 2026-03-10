# Video Archive Application

System Architecture

---

## Overview

The Video Archive application is a web system that allows users to browse and manage video files stored on a Ubuntu server.

The system is composed of:

- React frontend
- Node.js + Express backend
- Prisma ORM
- SQLite database (initial implementation)
- filesystem storage for video files

The architecture is designed to support future migration to PostgreSQL and future extensions such as user management and operation logging.

---

## High-Level Architecture

Browser  
│  
│ HTTP requests  
▼

React Frontend  
│  
│ fetch API  
▼

Express Backend  
│  
├── Services  
├── Repositories  
├── Prisma Client  
│  
├── Video filesystem  
└── Database

---

## Frontend

Technology stack:

- React
- TypeScript
- Vite
- fetch API
- React Router
- HTML5 video player

Responsibilities:

- UI rendering
- search filters
- displaying video list
- video playback
- favorites management
- communication with backend APIs

The frontend must remain simple, modular and independent from persistence details.

---

## Backend

Technology stack:

- Node.js
- Express
- TypeScript
- Prisma ORM

Responsibilities:

- reading video files from filesystem
- filtering videos by time range
- identifying the latest video
- streaming videos to browser
- downloading video files
- managing favorites
- providing stable REST APIs for the frontend

The backend should be organized in layers.

### Backend layers

#### Routes

Express route handlers responsible for HTTP input/output.

#### Services

Business logic layer.

#### Repositories

Persistence abstraction layer used by services.

#### Prisma Client

Database access layer used by repositories.

#### Database

Actual storage engine.

This layering is intended to reduce coupling between business logic and database technology.

---

## Database Strategy

The application uses Prisma ORM as the persistence abstraction layer.

### Current database

- SQLite

### Future database

- PostgreSQL

The goal is to avoid a traumatic migration in the future.

By introducing Prisma and repositories early, the application can evolve from SQLite to PostgreSQL with limited impact on:

- routes
- services
- frontend APIs

The main expected changes for a future migration are:

- database provider in `prisma/schema.prisma`
- `DATABASE_URL` environment variable
- database migrations and data migration

---

## Video Storage

Video files are stored on the server filesystem.

Example directory:

```text
/data/videos

Video timestamp can be extracted from:

filename

filesystem modification time

Example filenames:

2026-03-09_10-00.mp4
2026-03-09_10-10.mp4

The filesystem-based video logic is independent from database persistence.

Persistence Model
Current persisted entity

Favorites are stored in the database.

Current model:

id

videoPath

createdAt

Future persisted entities

The architecture is intentionally prepared for future entities such as:

User

AuditLog

UserFavorite

UserSession

This is one of the reasons for adopting Prisma early.

Example Prisma Model

Example current model:

model Favorite {
  id        Int      @id @default(autoincrement())
  videoPath String   @unique
  createdAt DateTime @default(now())
}

Possible future evolution:

model User {
  id        Int        @id @default(autoincrement())
  username  String     @unique
  createdAt DateTime   @default(now())
  favorites Favorite[]
  logs      AuditLog[]
}

model Favorite {
  id        Int      @id @default(autoincrement())
  videoPath String
  createdAt DateTime @default(now())
  userId    Int?
  user      User?    @relation(fields: [userId], references: [id])

  @@unique([videoPath, userId])
}

model AuditLog {
  id        Int      @id @default(autoincrement())
  action    String
  target    String?
  createdAt DateTime @default(now())
  userId    Int?
  user      User?    @relation(fields: [userId], references: [id])
}

These future models are not required in the first version, but the architecture should not block them.

Backend Structure

Suggested backend folder structure:

backend
│
├── prisma
│   └── schema.prisma
│
├── src
│   ├── routes
│   │   ├── videos.ts
│   │   └── favorites.ts
│   │
│   ├── services
│   │   ├── videoService.ts
│   │   └── favoriteService.ts
│   │
│   ├── repositories
│   │   └── favoriteRepository.ts
│   │
│   ├── db
│   │   └── prisma.ts
│   │
│   ├── utils
│   │   ├── parseVideoTimestamp.ts
│   │   └── pathValidator.ts
│   │
│   └── server.ts
│
└── package.json
Frontend Structure

Suggested frontend folder structure:

frontend
│
├── src
│   ├── pages
│   │   ├── HomePage.tsx
│   │   ├── VideoPlayerPage.tsx
│   │   └── FavoritesPage.tsx
│   │
│   ├── components
│   │   ├── AppHeader.tsx
│   │   ├── AppMenu.tsx
│   │   ├── SearchPanel.tsx
│   │   ├── VideoList.tsx
│   │   ├── VideoCard.tsx
│   │   └── VideoPlayer.tsx
│   │
│   ├── api
│   │   ├── videos.ts
│   │   └── favorites.ts
│   │
│   ├── types
│   │   ├── video.ts
│   │   └── favorite.ts
│   │
│   └── App.tsx
│
└── package.json
Deployment

The backend runs on Ubuntu using Node.js.

Process management is handled by PM2.

Example command:

pm2 start dist/server.js --name video-app

The frontend is built separately and served as a web application.

Environment Configuration

Main backend configuration variables:

PORT=3000
VIDEO_BASE_PATH=/data/videos
DATABASE_URL=file:./data/videos.db

Future PostgreSQL example:

DATABASE_URL=postgresql://user:password@host:5432/videoarchive?schema=public
Future Extensions

The architecture is intentionally designed to support future features:

user authentication

operation logging

user roles

video indexing

PostgreSQL migration

live streaming support

administrative dashboard
```
