import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Favorite, Video } from "../types/index";
import { getFavorites, removeFavorite } from "../api/favorites";
import { getVideos, getVideoDownloadUrl } from "../api/videos";
import { AppHeader } from "../components/AppHeader";

export function FavoritesPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [favs, vids] = await Promise.all([getFavorites(), getVideos()]);
        setFavorites(favs);
        setVideos(vids);
      } catch (err) {
        console.error("Failed to load favorites:", err);
        setError("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRemoveFavorite = async (favoriteId: number) => {
    try {
      await removeFavorite(favoriteId);
      setFavorites(favorites.filter((f) => f.id !== favoriteId));
    } catch (err) {
      console.error("Failed to remove favorite:", err);
      alert("Failed to remove favorite");
    }
  };

  const handlePlayFavorite = (favorite: Favorite) => {
    // Find the video by matching ID in path
    const videoId = favorite.videoPath.split("/").pop();
    const video = videos.find((v) => v.id === videoId);

    if (video) {
      navigate(`/video/${video.id}`, { state: { video } });
    } else {
      alert("Video not found");
    }
  };

  const handleDownloadFavorite = (favorite: Favorite) => {
    const videoId = favorite.videoPath.split("/").pop();
    if (videoId) {
      const url = getVideoDownloadUrl(videoId);
      const a = document.createElement("a");
      a.href = url;
      a.download = favorite.videoPath.split("/").pop() || "video";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  if (loading) {
    return (
      <div className="favorites-page">
        <AppHeader />
        <main className="page-content">
          <div className="loading">Loading favorites...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="favorites-page">
        <AppHeader />
        <main className="page-content">
          <div className="error-message">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <AppHeader />

      <main className="page-content">
        <h2>Favorite Videos</h2>

        {favorites.length === 0 ? (
          <div className="video-list-empty">
            <p>No favorites yet</p>
          </div>
        ) : (
          <div className="video-list">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="video-card">
                <div className="video-card-info">
                  <h3 className="video-name">
                    {favorite.videoPath.split("/").pop()}
                  </h3>
                  <p className="video-time">
                    {new Date(favorite.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="video-card-actions">
                  <button
                    className="video-action-btn"
                    onClick={() => handlePlayFavorite(favorite)}
                    title="Play video"
                  >
                    ▶
                  </button>
                  <button
                    className="video-action-btn favorite-active"
                    onClick={() => handleRemoveFavorite(favorite.id)}
                    title="Remove favorite"
                  >
                    ⭐
                  </button>
                  <button
                    className="video-action-btn"
                    onClick={() => handleDownloadFavorite(favorite)}
                    title="Download video"
                  >
                    ⬇
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
