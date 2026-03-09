# Video Archive Application

System Architecture

---

# Overview

The Video Archive application is a web system that allows users to browse and manage video files stored on a Ubuntu server.

The system is composed of:

- React frontend
- Node.js + Express backend
- SQLite database
- filesystem storage for video files

---

# High-Level Architecture

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
├── Video filesystem
└── SQLite database

---

# Frontend

Technology stack:

- React
- TypeScript
- Vite
- fetch API
- HTML5 video player

Responsibilities:

- UI rendering
- search filters
- displaying video list
- video playback
- favorites management
- communication with backend APIs

---

# Backend

Technology stack:

- Node.js
- Express
- SQLite

Responsibilities:

- reading video files from filesystem
- filtering videos by time range
- identifying the latest video
- streaming videos to browser
- downloading video files
- storing favorites

---

# Video Storage

Video files are stored on the server filesystem.

Example directory:

/data/videos

Video timestamp can be extracted from:

1. filename
2. filesystem modification time

Example filenames:

2026-03-09_10-00.mp4
2026-03-09_10-10.mp4

---

# Database

SQLite is used for storing favorite videos.

Table: favorites

| Field      | Description                       |
| ---------- | --------------------------------- |
| id         | primary key                       |
| video_path | path to video file                |
| created_at | timestamp when favorite was added |

---

# Backend Structure

Example backend folder structure:

backend
│
├── src
│ ├── routes
│ │ ├── videos.ts
│ │ └── favorites.ts
│ │
│ ├── services
│ │ ├── videoService.ts
│ │ └── favoriteService.ts
│ │
│ ├── db
│ │ └── sqlite.ts
│ │
│ └── server.ts
│
└── package.json

---

# Frontend Structure

Example frontend folder structure:

frontend
│
├── src
│ ├── pages
│ │ ├── HomePage.tsx
│ │ ├── VideoPlayerPage.tsx
│ │ └── FavoritesPage.tsx
│ │
│ ├── components
│ │ ├── AppHeader.tsx
│ │ ├── VideoList.tsx
│ │ ├── VideoCard.tsx
│ │ └── VideoPlayer.tsx
│ │
│ ├── api
│ │ ├── videos.ts
│ │ └── favorites.ts
│ │
│ └── App.tsx
│
└── package.json

---

# Deployment

The backend runs on Ubuntu using Node.js.

Process management is handled by **PM2**.

Example command:

pm2 start dist/server.js --name video-app

---

# Future Extensions

The architecture is designed to support future features:

- user authentication
- operation logging
- user roles
- video indexing
- live streaming support
