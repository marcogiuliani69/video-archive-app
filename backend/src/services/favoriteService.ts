// Favorite service for managing favorite videos

import { Favorite } from "../types/favorite";
import { getDatabase } from "../db/sqlite";

/**
 * Get all favorites
 */
export async function getFavorites(): Promise<Favorite[]> {
  try {
    const db = await getDatabase();
    const favorites = await db.all(
      "SELECT id, video_path as videoPath, created_at as createdAt FROM favorites ORDER BY created_at DESC",
    );
    return favorites || [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
}

/**
 * Add a video to favorites
 */
export async function addFavorite(videoPath: string): Promise<Favorite | null> {
  try {
    const db = await getDatabase();
    const createdAt = new Date().toISOString();

    const result = await db.run(
      "INSERT INTO favorites (video_path, created_at) VALUES (?, ?)",
      videoPath,
      createdAt,
    );

    if (result.lastID) {
      return {
        id: result.lastID,
        videoPath,
        createdAt,
      };
    }
    return null;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
}

/**
 * Remove a video from favorites
 */
export async function removeFavorite(favoriteId: number): Promise<boolean> {
  try {
    const db = await getDatabase();
    const result = await db.run(
      "DELETE FROM favorites WHERE id = ?",
      favoriteId,
    );
    return (result.changes || 0) > 0;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
}

/**
 * Remove a favorite by video path
 */
export async function removeFavoriteByPath(
  videoPath: string,
): Promise<boolean> {
  try {
    const db = await getDatabase();
    const result = await db.run(
      "DELETE FROM favorites WHERE video_path = ?",
      videoPath,
    );
    return (result.changes || 0) > 0;
  } catch (error) {
    console.error("Error removing favorite by path:", error);
    throw error;
  }
}

/**
 * Check if a video is a favorite
 */
export async function isFavorite(videoPath: string): Promise<boolean> {
  try {
    const db = await getDatabase();
    const result = await db.get(
      "SELECT id FROM favorites WHERE video_path = ?",
      videoPath,
    );
    return !!result;
  } catch (error) {
    console.error("Error checking favorite:", error);
    return false;
  }
}
