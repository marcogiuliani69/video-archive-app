// Frontend Video type definitions

export interface Video {
  id: string;
  name: string;
  timestamp: string;
  isFavorite: boolean;
}

export interface SearchParams {
  start: string;
  end: string;
}
