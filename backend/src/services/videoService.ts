// Video service for filesystem access and video discovery

import fs from "fs/promises";
import path from "path";
import { Video } from "../types/video";
import {
  extractVideoTimestamp,
  parseVideoTimestamp,
} from "../utils/parseVideoTimestamp";
import { validateVideoPath } from "../utils/pathValidator";
import { getDatabase } from "../db/sqlite";

const BASE_PATH = process.env.VIDEO_BASE_PATH || "/data/videos";
const SUPPORTED_FORMATS = [".mp4", ".webm", ".mkv", ".avi"];

/**
 * Get all video files from the filesystem
 */
async function listVideoFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(BASE_PATH);
    return files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return SUPPORTED_FORMATS.includes(ext);
    });
  } catch (error) {
    console.error("Error reading video directory:", error);
    return [];
  }
}

/**
 * Check if a video is marked as favorite
 */
async function isVideoFavorite(videoPath: string): Promise<boolean> {
  try {
    const db = await getDatabase();
    const result = await db.get(
      "SELECT id FROM favorites WHERE video_path = ?",
      videoPath,
    );
    return !!result;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false;
  }
}

/**
 * Get a single video by filename
 */
export async function getVideoFile(videoId: string): Promise<Video | null> {
  const videoPath = path.join(BASE_PATH, videoId);

  // Validate path to prevent path traversal
  if (!validateVideoPath(videoPath, BASE_PATH)) {
    return null;
  }

  try {
    const stats = await fs.stat(videoPath);
    if (!stats.isFile()) {
      return null;
    }

    const timestamp = await extractVideoTimestamp(videoId, videoPath);
    const isFavorite = await isVideoFavorite(videoPath);

    return {
      id: videoId,
      name: videoId,
      timestamp,
      isFavorite,
      path: videoPath,
      size: stats.size,
    };
  } catch (error) {
    console.error("Error getting video file:", error);
    return null;
  }
}

/**
 * Get all videos with optional time range filter
 */
export async function getVideos(
  startTime?: string,
  endTime?: string,
): Promise<Video[]> {
  const files = await listVideoFiles();
  const videos: Video[] = [];

  for (const file of files) {
    const videoPath = path.join(BASE_PATH, file);

    try {
      const timestamp = await extractVideoTimestamp(file, videoPath);
      const stats = await fs.stat(videoPath);
      const isFavorite = await isVideoFavorite(videoPath);

      const video: Video = {
        id: file,
        name: file,
        timestamp,
        isFavorite,
        path: videoPath,
        size: stats.size,
      };

      // Filter by time range if provided
      if (startTime && endTime) {
        const ts = new Date(timestamp).getTime();
        const start = new Date(startTime).getTime();
        const end = new Date(endTime).getTime();

        if (ts >= start && ts <= end) {
          videos.push(video);
        }
      } else {
        videos.push(video);
      }
    } catch (error) {
      console.error(`Error processing video ${file}:`, error);
      continue;
    }
  }

  // Sort by timestamp descending (newest first)
  videos.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return videos;
}

/**
 * Get the latest video
 */
export async function getLatestVideo(): Promise<Video | null> {
  const videos = await getVideos();
  return videos.length > 0 ? videos[0] : null;
}

/**
 * Get video file path and validate it exists
 */
export async function getVideoFilePath(
  videoId: string,
): Promise<string | null> {
  const videoPath = path.join(BASE_PATH, videoId);

  if (!validateVideoPath(videoPath, BASE_PATH)) {
    return null;
  }

  try {
    await fs.stat(videoPath);
    return videoPath;
  } catch {
    return null;
  }
}
