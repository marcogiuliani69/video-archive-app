// Video routes - API endpoints for video access

import express from "express";
import * as videoService from "../services/videoService";
import fs from "fs";

const router = express.Router();

/**
 * GET /api/videos
 * Get videos within a time range
 * Query params: start (ISO datetime), end (ISO datetime)
 */
router.get("/", async (req, res) => {
  try {
    const { start, end } = req.query;

    if (start && typeof start !== "string") {
      return res.status(400).json({ error: "Invalid start parameter" });
    }
    if (end && typeof end !== "string") {
      return res.status(400).json({ error: "Invalid end parameter" });
    }

    const videos = await videoService.getVideos(start, end);
    res.json(videos);
  } catch (error) {
    console.error("Error getting videos:", error);
    res.status(500).json({ error: "Failed to get videos" });
  }
});

/**
 * GET /api/videos/latest
 * Get the latest video
 */
router.get("/latest", async (req, res) => {
  try {
    const video = await videoService.getLatestVideo();
    if (!video) {
      return res.status(404).json({ error: "No videos found" });
    }
    res.json(video);
  } catch (error) {
    console.error("Error getting latest video:", error);
    res.status(500).json({ error: "Failed to get latest video" });
  }
});

/**
 * GET /api/videos/:id/stream
 * Stream a video file with support for HTTP Range requests
 */
router.get("/:id/stream", async (req, res) => {
  try {
    const { id } = req.params;

    const videoPath = await videoService.getVideoFilePath(id);
    if (!videoPath) {
      return res.status(404).json({ error: "Video not found" });
    }

    const stats = fs.statSync(videoPath);
    const fileSize = stats.size;

    // Handle Range requests for streaming
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize) {
        return res.status(416).send("Requested Range Not Satisfiable");
      }

      const chunksize = end - start + 1;
      res.status(206);
      res.set({
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      });

      const stream = fs.createReadStream(videoPath, { start, end });
      stream.pipe(res);
    } else {
      res.set({
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
        "Accept-Ranges": "bytes",
      });

      const stream = fs.createReadStream(videoPath);
      stream.pipe(res);
    }
  } catch (error) {
    console.error("Error streaming video:", error);
    res.status(500).json({ error: "Failed to stream video" });
  }
});

/**
 * GET /api/videos/:id/download
 * Download a video file
 */
router.get("/:id/download", async (req, res) => {
  try {
    const { id } = req.params;

    const videoPath = await videoService.getVideoFilePath(id);
    if (!videoPath) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.set({
      "Content-Disposition": `attachment; filename="${id}"`,
      "Content-Type": "video/mp4",
    });

    const stream = fs.createReadStream(videoPath);
    stream.pipe(res);
  } catch (error) {
    console.error("Error downloading video:", error);
    res.status(500).json({ error: "Failed to download video" });
  }
});

export default router;
