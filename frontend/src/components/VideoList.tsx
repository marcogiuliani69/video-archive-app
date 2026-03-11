import { Video } from "../types/index";
import { getVideoDownloadUrl } from "../api/videos";
import { addFavorite, removeFavorite } from "../api/favorites";

interface VideoListProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
  onFavoriteToggle?: () => void;
}

export function VideoList({
  videos,
  onVideoClick,
  onFavoriteToggle,
}: VideoListProps) {
  const handleFavoriteClick = async (e: React.MouseEvent, video: Video) => {
    e.stopPropagation();

    try {
      if (video.isFavorite) {
        // Need to find favorite ID - for now, just show alert
        alert("Remove favorite: API requires favorite ID, not implemented yet");
      } else {
        await addFavorite(video.id);
        if (onFavoriteToggle) onFavoriteToggle();
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      alert("Failed to toggle favorite");
    }
  };

  const handleDownloadClick = (e: React.MouseEvent, video: Video) => {
    e.stopPropagation();
    const url = getVideoDownloadUrl(video.id);
    const a = document.createElement("a");
    a.href = url;
    a.download = video.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (videos.length === 0) {
    return (
      <div className="video-list-empty">
        <p>No videos found</p>
      </div>
    );
  }

  return (
    <div className="video-list">
      {videos.map((video) => (
        <div
          key={video.id}
          className="video-card"
          onClick={() => onVideoClick(video)}
        >
          <div className="video-card-info">
            <h3 className="video-name">{video.name}</h3>
            <p className="video-time">
              {new Date(video.timestamp).toLocaleString()}
            </p>
          </div>
          <div className="video-card-actions">
            <button className="video-action-btn" title="Play video">
              ▶
            </button>
            <button
              className={`video-action-btn ${
                video.isFavorite ? "favorite-active" : ""
              }`}
              onClick={(e) => handleFavoriteClick(e, video)}
              title={video.isFavorite ? "Remove favorite" : "Add favorite"}
            >
              {video.isFavorite ? "⭐" : "☆"}
            </button>
            <button
              className="video-action-btn"
              onClick={(e) => handleDownloadClick(e, video)}
              title="Download video"
            >
              ⬇
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
