// Utility to parse video timestamp from filename or filesystem

import path from "path";
import fs from "fs/promises";

/**
 * Parse timestamp from video filename
 * Expected format: YYYY-MM-DD_HH-mm.mp4
 * Example: 2026-03-09_10-00.mp4
 */
export function parseVideoTimestamp(filename: string): string | null {
  const nameWithoutExt = path.parse(filename).name;
  const match = nameWithoutExt.match(
    /^(\d{4})-(\d{2})-(\d{2})_(\d{2})-(\d{2})$/,
  );

  if (!match) {
    return null;
  }

  const [, year, month, day, hour, minute] = match;
  return `${year}-${month}-${day}T${hour}:${minute}:00`;
}

/**
 * Get file modification time as ISO string
 */
export async function getFileModificationTime(
  filePath: string,
): Promise<string> {
  const stats = await fs.stat(filePath);
  return stats.mtime.toISOString();
}

/**
 * Extract timestamp from video file
 * First tries filename, then falls back to modification time
 */
export async function extractVideoTimestamp(
  filename: string,
  filePath: string,
): Promise<string> {
  const filenameTimestamp = parseVideoTimestamp(filename);

  if (filenameTimestamp) {
    return filenameTimestamp;
  }

  return getFileModificationTime(filePath);
}
