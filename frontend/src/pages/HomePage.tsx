import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVideos } from "../api/videos";
import { Video } from "../types/index";
import { AppHeader } from "../components/AppHeader";
import { VideoList } from "../components/VideoList";

export function HomePage() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchVideos = async (start?: string, end?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getVideos(start, end);
      setVideos(data);
    } catch (err) {
      setError("Failed to load videos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSearch = () => {
    fetchVideos(startDate || undefined, endDate || undefined);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    fetchVideos();
  };

  const handleVideoClick = (video: Video) => {
    navigate(`/video/${video.id}`, { state: { video } });
  };

  return (
    <div className="home-page">
      <AppHeader />

      <main className="page-content">
        <section className="search-section">
          <div className="search-panel">
            <div className="search-field">
              <label htmlFor="start-date">Start</label>
              <input
                id="start-date"
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="search-field">
              <label htmlFor="end-date">End</label>
              <input
                id="end-date"
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="search-buttons">
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
              <button className="btn btn-secondary" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        </section>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading videos...</div>
        ) : (
          <VideoList
            videos={videos}
            onVideoClick={handleVideoClick}
            onFavoriteToggle={() => {
              handleSearch();
            }}
          />
        )}
      </main>
    </div>
  );
}
