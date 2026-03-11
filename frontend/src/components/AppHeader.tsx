import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLatestVideo } from "../api/videos";

export function AppHeader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLatestClick = async () => {
    setLoading(true);
    try {
      const latest = await getLatestVideo();
      navigate(`/video/${latest.id}`, { state: { video: latest } });
    } catch (error) {
      console.error("Failed to load latest video:", error);
      alert("Could not load latest video");
    } finally {
      setLoading(false);
    }
  };

  const handleFavoritesClick = () => {
    navigate("/favorites");
    setMenuOpen(false);
  };

  const handleHomeClick = () => {
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          title="Menu"
        >
          ☰
        </button>
        <h1 className="app-title">🎥 Video Archive</h1>
      </div>

      <div className="header-right">
        <button
          className="header-button"
          onClick={handleLatestClick}
          disabled={loading}
          title="Latest video"
        >
          ⏺
        </button>
        <button
          className="header-button"
          onClick={handleFavoritesClick}
          title="Favorites"
        >
          ⭐
        </button>
      </div>

      {menuOpen && (
        <nav className="header-menu">
          <ul>
            <li>
              <button onClick={handleHomeClick}>Home</button>
            </li>
            <li>
              <button onClick={handleFavoritesClick}>Favorites</button>
            </li>
            <li>
              <button onClick={() => alert("Settings coming soon")}>
                Settings
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
