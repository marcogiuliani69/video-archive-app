// Favorite service for managing favorite videos

import { Favorite } from "../types/favorite";
import { favoriteRepository } from "../repositories/favoriteRepository";

/**
 * Get all favorites
 */
export async function getFavorites(): Promise<Favorite[]> {
  try {
    return await favoriteRepository.getAll();
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
    return await favoriteRepository.create(videoPath);
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
    return await favoriteRepository.deleteById(favoriteId);
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
    return await favoriteRepository.deleteByPath(videoPath);
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
    return await favoriteRepository.exists(videoPath);
  } catch (error) {
    console.error("Error checking favorite:", error);
    return false;
  }
}
