# Video Archive Web Application

Technical Specification

## 1. Overview

This project is a web application that allows users to browse and manage
video files stored on a Ubuntu server.

The application must allow users to:

- search videos by time range
- play videos directly in the browser
- download video files
- mark videos as favorites
- quickly access the most recent video

The system will be developed by a single developer and deployed on an Ubuntu server.

---

# 2. Architecture

The application is composed of a frontend and a backend.

## Frontend

Technology stack:

- React
- TypeScript
- Vite
- fetch API
- HTML5 video player

Responsibilities:

- UI rendering
- time range search
- video list display
- video playback
- favorites management
- API communication

---

## Backend

Technology stack:

- Node.js
- Express
- SQLite

Responsibilities:

- read video files from filesystem
- filter videos by time range
- return the most recent video
- stream videos to browser
- allow video download
- manage favorites

---

## Deployment

Environment:

- Ubuntu server
- Node.js runtime
- PM2 process manager

---

# 3. Video Storage

Videos are stored on the filesystem.

Example directory:
/data/videos

Video timestamp should be extracted from:

1. filename
2. filesystem modification time

Example filename:

2026-03-09_10-00.mp4
2026-03-09_10-10.mp4

---

# 4. Database

SQLite is used to store favorite videos.

## Table: favorites

id INTEGER PRIMARY KEY AUTOINCREMENT
video_path TEXT UNIQUE
created_at TEXT

---

# 5. Backend API

## Get videos in time range

GET /api/videos?start=&end=

Example:

GET /api/videos?start=2026-03-09T10:00&end=2026-03-09T11:00

Response example:

[
{
"id": "2026-03-09_10-00.mp4",
"name": "2026-03-09_10-00.mp4",
"timestamp": "2026-03-09T10:00:00",
"isFavorite": false
}
]

---

## Get latest video

GET /api/videos/latest

---

## Stream video

GET /api/videos/:id/stream

Requirements:

- support HTTP Range requests
- handle file not found
- validate file path

---

## Download video

GET /api/videos/:id/download

Requirements:

- use Content-Disposition attachment
- prevent path traversal

---

## Favorites

Get favorites:

GET /api/favorites

Add favorite:

POST /api/favorites

Remove favorite:

DELETE /api/favorites/:id

---

# 6. User Interface

The UI must be simple and clean.

## Main layout

+--------------------------------------------------------------------+
| 🎥 Video Archive ⭐ ⏺ ☰ |
+--------------------------------------------------------------------+

Search videos

Start datetime: []
End datetime: []

[ Search ] [ Reset ]

Video list

Video name
Timestamp

▶ Play ⭐ Favorite ⬇ Download

---

## Header

Header must include:

- application title
- favorites shortcut
- latest video shortcut
- expandable menu

Menu items:

- Home
- Favorites
- Latest video
- Login (future feature)
- Logs (future feature)
- Settings (future feature)
- About

---

# 7. Pages

Frontend pages:

HomePage
VideoPlayerPage
FavoritesPage

---

# 8. Environment variables

PORT=3000
VIDEO_BASE_PATH=/data/videos
SQLITE_DB_PATH=./data/app.db

---

# 9. Acceptance Criteria

The application is considered complete when:

- video search works with time range
- latest video can be opened
- videos can be played in browser
- videos can be downloaded
- favorites can be added and removed
- the application runs locally
- backend can run with PM2
