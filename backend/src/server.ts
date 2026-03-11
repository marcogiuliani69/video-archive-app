// Deve essere PRIMO - prima di tutto il resto
import "./env.js";

import express from "express";
import cors from "cors";
import { getPrismaClient, closePrismaClient } from "./db/prisma.js";
import videosRouter from "./routes/videos.js";
import favoritesRouter from "./routes/favorites.js";

// Rimuovi l'import di dotenv e dotenv.config() che erano qui
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

// Initialize server
async function startServer() {
  try {
    // Initialize Prisma client (schema must be set up via prisma migrate)
    const prisma = getPrismaClient();
    await prisma.$connect();
    console.log("Database connected");

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Graceful shutdown
    process.on("SIGTERM", async () => {
      console.log("SIGTERM received, shutting down gracefully");
      server.close(async () => {
        await closePrismaClient();
        process.exit(0);
      });
    });

    process.on("SIGINT", async () => {
      console.log("SIGINT received, shutting down gracefully");
      server.close(async () => {
        await closePrismaClient();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
