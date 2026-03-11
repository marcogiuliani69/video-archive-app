# Prompt 05 — Frontend Generation

## Context

Read the project documentation:

- docs/spec.md
- docs/api.md
- docs/architecture.md

This repository contains a web application for browsing and managing
video files stored on a Ubuntu server.

The backend is already implemented separately and exposes REST APIs.

Frontend stack:

- React
- TypeScript
- Vite
- fetch API
- React Router

The frontend must interact with the existing backend API.

---

## Task

Generate the initial frontend application structure and implementation.

---

## Constraints

- modify frontend files only
- do not modify backend files
- use React + TypeScript
- use Vite
- use fetch API for HTTP calls
- use React Router for navigation
- do not use Redux
- do not use TanStack Query
- keep state management simple with useState and useEffect
- keep the structure modular and easy to evolve
- create a clean, modern and readable UI
- follow the architecture described in docs/architecture.md
- follow the API contract described in docs/api.md

---

## Expected Output

Generate the frontend project with the following structure and features.

### Pages

- HomePage
- VideoPlayerPage
- FavoritesPage

### Components

- AppHeader
- AppMenu
- SearchPanel
- VideoList
- VideoCard
- VideoPlayer

### API helpers

- src/api/videos.ts
- src/api/favorites.ts

### Types

- src/types/video.ts
- src/types/favorite.ts

### Routing

Configure React Router with routes for:

- /
- /video/:id
- /favorites

### UI requirements

The UI must include:

- a header with application title
- favorites shortcut
- latest video shortcut
- expandable menu
- search by time range
- list of videos with actions:
  - play
  - favorite
  - download

### Home page

The home page must contain:

- header
- search panel with:
  - start datetime
  - end datetime
  - search button
  - reset button
- video list area

### Video player page

The video page must contain:

- video player
- video name
- timestamp
- favorite action
- download action
- navigation back to the list

### Favorites page

The favorites page must contain:

- header
- list of favorite videos
- play action
- remove favorite action
- download action

### API integration

Implement fetch-based API helpers for:

- GET /api/videos
- GET /api/videos/latest
- GET /api/favorites
- POST /api/favorites
- DELETE /api/favorites/:id

Use a configurable API base URL.

---

## Validation

Ensure:

- frontend compiles successfully
- routing is configured correctly
- components are modular
- API helpers match the backend endpoints
- only frontend files are modified
- no Redux or TanStack Query is introduced

The plan is good, but simplify the implementation before generating code.

Adjust the plan with these constraints:

1. Do not create custom hooks yet
2. Do not create FavoriteButton as a separate component yet
3. Do not create extra utils files unless strictly necessary
4. Keep styling simple, with minimal CSS files
5. Use a simple modular structure:
   - pages
   - components
   - api
   - types
6. Use Vite proxy and default API base path "/api"
7. Do not assume a dedicated GET /api/videos/:id endpoint exists
8. Keep the minimum viable frontend structure required by the project
9. Do not modify backend files

Now provide the revised implementation plan before generating code.

Apply the revised frontend implementation plan.

Constraints:

- modify frontend files only
- use React + TypeScript + Vite
- use fetch API
- use React Router
- no Redux
- no TanStack Query
- no custom hooks yet
- no unnecessary abstractions
- keep the structure simple and modular
- use "/api" as default API base path
- make the minimum set of changes required
