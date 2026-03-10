// Favorites routes - API endpoints for managing favorites

import express from "express";
import * as favoriteService from "../services/favoriteService";

const router = express.Router();

/**
 * GET /api/favorites
 * Get all favorite videos
 */
router.get("/", async (req, res) => {
  try {
    const favorites = await favoriteService.getFavorites();
    res.json(favorites);
  } catch (error) {
    console.error("Error getting favorites:", error);
    res.status(500).json({ error: "Failed to get favorites" });
  }
});

/**
 * POST /api/favorites
 * Add a video to favorites
 * Body: { videoPath: string }
 */
router.post("/", async (req, res) => {
  try {
    const { videoPath } = req.body;

    if (!videoPath || typeof videoPath !== "string") {
      return res.status(400).json({ error: "Invalid videoPath parameter" });
    }

    const favorite = await favoriteService.addFavorite(videoPath);
    if (!favorite) {
      return res.status(400).json({ error: "Failed to add favorite" });
    }

    res.status(201).json(favorite);
  } catch (error: any) {
    console.error("Error adding favorite:", error);

    // Handle duplicate entry
    if (error.message?.includes("UNIQUE constraint failed")) {
      return res.status(409).json({ error: "Video is already in favorites" });
    }

    res.status(500).json({ error: "Failed to add favorite" });
  }
});

/**
 * DELETE /api/favorites/:id
 * Remove a video from favorites
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const favoriteId = parseInt(id, 10);

    if (isNaN(favoriteId)) {
      return res.status(400).json({ error: "Invalid favorite ID" });
    }

    const success = await favoriteService.removeFavorite(favoriteId);
    if (!success) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
});

export default router;
