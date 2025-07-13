const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors()); 

app.get("/video", (req, res) => {
  const videoPath = path.join(__dirname, "assets", "protected_video.mp4");

  const range = req.headers.range;
  if (!range) {
    return res.status(400).send("Requires Range header");
  }

  const videoSize = fs.statSync(videoPath).size;
  const CHUNK_SIZE = 1 * 1e6; 
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

app.listen(PORT, () => {
  console.log(`✅ Video streaming server running at http://localhost:${PORT}/video`);
});
