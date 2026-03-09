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
SQLITE_DB_PATH=./data/app.db

---

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

Start backend using PM2:

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
