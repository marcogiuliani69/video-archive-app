import { Favorite } from "../types/index";

const API_BASE = "/api";

export async function getFavorites(): Promise<Favorite[]> {
  const response = await fetch(`${API_BASE}/favorites`);
  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }
  return response.json();
}

export async function addFavorite(videoPath: string): Promise<Favorite> {
  const response = await fetch(`${API_BASE}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoPath }),
  });

  if (!response.ok) {
    throw new Error("Failed to add favorite");
  }
  return response.json();
}

export async function removeFavorite(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/favorites/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to remove favorite");
  }
}
