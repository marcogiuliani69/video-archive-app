import { getVideoStreamUrl } from "../api/videos";

interface VideoPlayerProps {
  videoId: string;
}

export function VideoPlayer({ videoId }: VideoPlayerProps) {
  const streamUrl = getVideoStreamUrl(videoId);

  return (
    <div className="video-player-container">
      <video
        className="video-player"
        controls
        onError={(e) => {
          console.error("Video playback error:", e);
        }}
      >
        <source src={streamUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
