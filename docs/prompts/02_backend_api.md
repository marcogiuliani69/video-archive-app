# Prompt 02 — Backend API Implementation

Read the project documentation:

- docs/spec.md
- docs/api.md
- docs/architecture.md

This project is a web application for browsing video files stored on a Ubuntu server.

The backend must be implemented using:

- Node.js
- Express
- TypeScript
- SQLite

The backend is responsible for:

- reading video files from filesystem
- filtering videos by time range
- streaming videos to the browser
- allowing video downloads
- managing favorites

Videos are stored in a directory defined by the environment variable:

VIDEO_BASE_PATH

Example:

/data/videos

Video timestamps should be extracted from:

1. filename
2. filesystem modification time

Example filename:

2026-03-09_10-00.mp4

---

## Required API endpoints

GET /api/videos?start=&end=
GET /api/videos/latest
GET /api/videos/:id/stream
GET /api/videos/:id/download

GET /api/favorites
POST /api/favorites
DELETE /api/favorites/:id

---

## Requirements

The backend must:

- use modular structure
- separate routes and services
- validate input parameters
- prevent path traversal
- support HTTP Range requests for video streaming
- return proper HTTP status codes

---

## Suggested backend structure

backend
src
routes
videos.ts
favorites.ts

services
videoService.ts
favoriteService.ts

db
sqlite.ts

utils
parseVideoTimestamp.ts
safePath.ts

server.ts

---

## Tasks

Generate the initial backend implementation including:

1. Express server setup
2. API routes
3. SQLite database connection
4. video service for filesystem access
5. favorites service
6. environment configuration
7. TypeScript configuration

Do not generate frontend code.
Focus only on backend.
