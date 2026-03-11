import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Video } from "../types/index";
import { getVideos, getVideoDownloadUrl } from "../api/videos";
import { addFavorite, removeFavorite, getFavorites } from "../api/favorites";
import { AppHeader } from "../components/AppHeader";
import { VideoPlayer } from "../components/VideoPlayer";

interface LocationState {
  video?: Video;
}

export function VideoPlayerPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;

  const [video, setVideo] = useState<Video | null>(state?.video || null);
  const [loading, setLoading] = useState(!video);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (video || !id) return;

    // Try to find video from list
    const fetchVideo = async () => {
      setLoading(true);
      setError(null);
      try {
        const allVideos = await getVideos();
        const found = allVideos.find((v) => v.id === id);

        if (found) {
          setVideo(found);
        } else {
          setError("Video not found");
        }
      } catch (err) {
        console.error("Failed to fetch video:", err);
        setError("Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id, video]);

  const handleDownload = () => {
    if (!video) return;
    const url = getVideoDownloadUrl(video.id);
    const a = document.createElement("a");
    a.href = url;
    a.download = video.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleFavoriteToggle = async () => {
    if (!video) return;

    try {
      if (video.isFavorite) {
        // Find the favorite by path and remove
        const favorites = await getFavorites();
        const fav = favorites.find((f) => f.videoPath.includes(video.id));
        if (fav) {
          await removeFavorite(fav.id);
          setVideo({ ...video, isFavorite: false });
        }
      } else {
        await addFavorite(video.id);
        setVideo({ ...video, isFavorite: true });
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      alert("Failed to toggle favorite");
    }
  };

  if (loading) {
    return (
      <div className="video-player-page">
        <AppHeader />
        <main className="page-content">
          <div className="loading">Loading video...</div>
        </main>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="video-player-page">
        <AppHeader />
        <main className="page-content">
          <div className="error-message">{error || "Video not found"}</div>
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            ← Back to list
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="video-player-page">
      <AppHeader />

      <main className="page-content">
        <VideoPlayer videoId={video.id} />

        <section className="video-details">
          <div className="video-info">
            <h2>{video.name}</h2>
            <p className="video-timestamp">
              {new Date(video.timestamp).toLocaleString()}
            </p>
          </div>

          <div className="video-details-actions">
            <button
              className={`btn ${
                video.isFavorite ? "btn-primary" : "btn-secondary"
              }`}
              onClick={handleFavoriteToggle}
            >
              {video.isFavorite ? "⭐ Favorited" : "☆ Add to favorites"}
            </button>
            <button className="btn btn-secondary" onClick={handleDownload}>
              ⬇ Download
            </button>
            <button className="btn btn-secondary" onClick={() => navigate("/")}>
              ← Back to list
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
