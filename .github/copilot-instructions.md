# Copilot Instructions

This repository contains a full-stack web application for browsing videos stored on an Ubuntu server.

Tech stack:

- Frontend: React, TypeScript, Vite, fetch API
- Backend: Node.js, Express, SQLite
- Runtime: Ubuntu, PM2

Project rules:

- Do not use Redux or TanStack Query
- Use fetch API for HTTP calls
- Keep frontend and backend separated
- Backend must protect against path traversal
- Video search must work by time range: start and end datetime
- Favorites are stored in SQLite
- Use modular TypeScript code
- Follow docs/spec.md, docs/api.md and docs/architecture.md
- UI must include: header, favorites, latest video, expandable menu
- Future placeholders: login, logs, settings
