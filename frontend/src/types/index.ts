export interface Video {
  id: string;
  name: string;
  timestamp: string;
  isFavorite: boolean;
}

export interface Favorite {
  id: number;
  videoPath: string;
  createdAt: string;
}
