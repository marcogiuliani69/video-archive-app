// Video type definitions

export interface Video {
  id: string;
  name: string;
  timestamp: string;
  isFavorite: boolean;
  path?: string;
  size?: number;
}
