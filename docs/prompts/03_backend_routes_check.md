# Prompt 03 — Backend Routes Verification

## Context

Read the project documentation:

- docs/spec.md
- docs/api.md
- docs/architecture.md

This repository contains a backend API built with:

- Node.js
- Express
- TypeScript
- SQLite

The backend is responsible for serving video information and managing favorites.

The server entry point is:

src/server.ts

---

## Task

Inspect the backend server implementation and verify that API routes
are correctly mounted.

If something is missing or incorrect, fix the code.

---

## Constraints

- modify backend files only
- do not modify frontend code
- keep the CommonJS TypeScript configuration
- do not refactor unrelated code
- keep the current folder structure

---

## Expected Output

Verify that these routers are mounted in `src/server.ts`:

app.use("/api/videos", videoRoutes)

app.use("/api/favorites", favoriteRoutes)

Add the following endpoints if they do not exist:

GET /

Example response:

{
"message": "Video Archive backend is running"
}

GET /health

Example response:

{
"status": "ok"
}

Ensure a JSON 404 handler exists:

app.use((req, res) => {
res.status(404).json({ error: "Not found" });
});

---

## Validation

Ensure:

- backend compiles successfully
- server starts without errors
- GET /health returns status OK
- /api/videos and /api/favorites endpoints are reachable
