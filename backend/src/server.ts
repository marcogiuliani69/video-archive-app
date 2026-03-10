// Backend Entry Point

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeDatabase } from "./db/sqlite.js";
import videosRouter from "./routes/videos.js";
import favoritesRouter from "./routes/favorites.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  }),
);

// Parse JSON
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Video Archive backend is running" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// API Routes
app.use("/api/videos", videosRouter);
app.use("/api/favorites", favoritesRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  },
);

// Initialize database and start server
async function startServer() {
  try {
    await initializeDatabase();
    console.log("Database initialized");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
