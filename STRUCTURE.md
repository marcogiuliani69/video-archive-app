# Video Archive Web Application

A full-stack web application for browsing, searching, and managing video files stored on an Ubuntu server.

## Project Structure

```
video-archive-app/
├── backend/                   # Node.js + Express backend
│   ├── src/
│   │   ├── server.ts         # Express application entry point
│   │   ├── routes/           # API route handlers
│   │   │   ├── videos.ts     # Video endpoints
│   │   │   └── favorites.ts  # Favorites endpoints
│   │   ├── services/         # Business logic
│   │   │   ├── videoService.ts
│   │   │   └── favoriteService.ts
│   │   ├── db/               # Database layer
│   │   │   └── sqlite.ts     # SQLite initialization
│   │   ├── middleware/       # Express middleware
│   │   ├── types/            # TypeScript type definitions
│   │   │   ├── video.ts
│   │   │   └── favorite.ts
│   │   └── utils/            # Utility functions
│   │       └── pathValidator.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example          # Environment variables template
│   └── .gitignore
│
├── frontend/                  # React + TypeScript frontend
│   ├── src/
│   │   ├── main.tsx          # React entry point
│   │   ├── App.tsx           # Root component
│   │   ├── index.css         # Global styles
│   │   ├── App.css           # App component styles
│   │   ├── pages/            # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── VideoPlayerPage.tsx
│   │   │   └── FavoritesPage.tsx
│   │   ├── components/       # Reusable components
│   │   │   ├── AppHeader.tsx
│   │   │   ├── VideoList.tsx
│   │   │   ├── VideoPlayer.tsx
│   │   │   ├── SearchForm.tsx
│   │   │   ├── SideMenu.tsx
│   │   │   └── FavoritesList.tsx
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useVideos.ts
│   │   │   └── useFavorites.ts
│   │   ├── services/         # API client
│   │   │   ├── videosApi.ts
│   │   │   └── favoritesApi.ts
│   │   ├── types/            # TypeScript definitions
│   │   │   └── video.ts
│   │   └── styles/           # Component styles
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── docs/                      # Documentation
│   ├── spec.md              # Technical specification
│   ├── api.md               # API documentation
│   ├── architecture.md      # Architecture overview
│   └── prompts/             # Setup instructions
│
├── .gitignore
└── README.md
```

## Backend Architecture

### Folder Descriptions

- **src/server.ts** - Express application initialization, middleware setup, and port listening
- **src/routes/** - API endpoint handlers organized by feature (videos, favorites)
- **src/services/** - Business logic layer handling video discovery, filtering, and database operations
- **src/db/** - SQLite database initialization and connection management
- **src/middleware/** - Express middleware for error handling, CORS, validation, etc.
- **src/types/** - TypeScript interfaces and types for type safety
- **src/utils/** - Utility functions including path validation for security

### Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: SQLite
- **Process Manager**: PM2 (for production deployment)

### Key Requirements

- ✅ Protects against path traversal attacks
- ✅ Supports video search by time range
- ✅ Streams video files with HTTP Range support
- ✅ Manages favorites in SQLite database
- ✅ Modular TypeScript code structure

## Frontend Architecture

### Folder Descriptions

- **src/main.tsx** - React DOM rendering entry point
- **src/App.tsx** - Root component and routing setup
- **src/pages/** - Full-page components (HomePage, VideoPlayer, Favorites)
- **src/components/** - Reusable UI components (Header, VideoList, Player, etc.)
- **src/hooks/** - Custom React hooks for data fetching and state management
- **src/services/** - API client functions for backend communication
- **src/types/** - TypeScript interfaces for type safety
- **src/styles/** - CSS files for component and global styling

### Technology Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Router**: React Router v6
- **HTTP Client**: Fetch API
- **Media Player**: HTML5 Video element

### UI Components

As per requirements, the UI includes:

- **Header** - Navigation and branding
- **Favorites** - List of saved favorite videos
- **Latest Video** - Quick access to the most recent video
- **Expandable Menu** - Navigation drawer/sidebar
- **Search Form** - Time range search interface
- **Video Player** - HTML5 video player with controls
- **Video List** - Grid/list view of videos

## Setup Instructions

### Prerequisites

- Node.js (18+)
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd video-archive-app
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your settings
   npm run build
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Edit .env with your settings
   ```

### Development

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
# Server runs on http://localhost:3000
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

### Production Build

**Backend:**

```bash
cd backend
npm run build
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
# Deploy dist/ folder to web server
```

## Environment Variables

### Backend (.env)

```
PORT=3000
NODE_ENV=development
VIDEOS_DIR=/data/videos
DATABASE_URL="file:./data/videos.db"
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=debug
```

### Frontend (.env)

```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENV=development
```

## API Endpoints

See [docs/api.md](docs/api.md) for complete API documentation.

### Summary

- `GET /api/videos?start=<datetime>&end=<datetime>` - Search videos by time range
- `GET /api/videos/latest` - Get latest video
- `GET /api/videos/:id/stream` - Stream video file
- `GET /api/videos/:id/download` - Download video
- `GET /api/favorites` - Get favorite videos
- `POST /api/favorites` - Add favorite
- `DELETE /api/favorites/:id` - Remove favorite

## Architecture Overview

```
Browser (React Frontend)
        ↓
    fetch API
        ↓
Express Backend (Node.js)
    ↓         ↓
Routes    Middleware
    ↓         ↓
Services  Error Handler
    ↓
Business Logic
    ↓
    ├─ Video Filesystem
    └─ SQLite Database
```

## Design Principles

1. **Separation of Concerns** - Frontend and backend completely separated
2. **Modular Structure** - Organized by feature/responsibility
3. **Type Safety** - Full TypeScript coverage
4. **Security** - Path traversal protection, input validation
5. **Scalability** - Service layer for future enhancements

## Next Steps

Follow the setup prompts in `docs/prompts/` directory for detailed implementation instructions.

## License

MIT
