import { Video } from "../types/index";

const API_BASE = "/api";

export async function getVideos(
  start?: string,
  end?: string,
): Promise<Video[]> {
  const params = new URLSearchParams();
  if (start) params.append("start", start);
  if (end) params.append("end", end);

  const response = await fetch(`${API_BASE}/videos?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }
  return response.json();
}

export async function getLatestVideo(): Promise<Video> {
  const response = await fetch(`${API_BASE}/videos/latest`);
  if (!response.ok) {
    throw new Error("Failed to fetch latest video");
  }
  return response.json();
}

export function getVideoStreamUrl(id: string): string {
  return `${API_BASE}/videos/${encodeURIComponent(id)}/stream`;
}

export function getVideoDownloadUrl(id: string): string {
  return `${API_BASE}/videos/${encodeURIComponent(id)}/download`;
}
