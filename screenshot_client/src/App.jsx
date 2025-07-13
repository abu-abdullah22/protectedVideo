import { useEffect, useRef, useState } from "react";

const sampleVideo = import.meta.env.VITE_VIDEO_SERVER_URL;

function CanvasVideoPlayer() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [overlayActive, setOverlayActive] = useState(false);

  const watermarkText = `user@email.com`;

  useEffect(() => {
    const interval = setInterval(() => {
      const x = Math.floor(Math.random() * (640 - 150));
      const y = Math.floor(Math.random() * (360 - 30));
      setPosition({ x, y });
    }, 2000 + Math.random() * 1000);

    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.key === "U") ||
        (e.ctrlKey && e.key === "S")
      ) {
        e.preventDefault();
        setOverlayActive(true);
        setTimeout(() => setOverlayActive(false), 3000); 
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

 
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      if (video.paused || video.ended) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

     
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = "16px Arial";
      ctx.fillText(
        `${watermarkText}.${new Date().toLocaleTimeString()}`,
        position.x,
        position.y
      );

      if (overlayActive) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.font = "bold 24px Arial";
        ctx.fillText("⚠ Screenshot blocked", 180, 180);
      }

      requestAnimationFrame(draw);
    };

    video.addEventListener("play", () => {
      requestAnimationFrame(draw);
    });

    return () => {
      video.removeEventListener("play", () => requestAnimationFrame(draw));
    };
  }, [position, overlayActive, watermarkText]);

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <canvas ref={canvasRef} width={640} height={360} />
      <div>
        <button onClick={handlePlay} disabled={isPlaying} style={btnStyle}>
          ▶️ Play
        </button>
        <button onClick={handlePause} disabled={!isPlaying} style={btnStyle}>
          ⏸ Pause
        </button>
      </div>

      <video
        ref={videoRef}
        src={sampleVideo}
        style={{ display: "none" }}
        crossOrigin="anonymous"
      />
    </div>
  );
}

const btnStyle = {
  backgroundColor: "#222",
  color: "#fff",
  border: "1px solid #555",
  padding: "8px 16px",
  fontSize: "16px",
  margin: "0 8px",
  borderRadius: "4px",
  cursor: "pointer",
};

export default CanvasVideoPlayer;
