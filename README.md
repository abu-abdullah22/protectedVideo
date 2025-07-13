# 🔒 Canvas-Based Video Player with Watermark and Screenshot Obfuscation

A **React + Express.js** based project that streams video securely from a backend and renders it using `<canvas>` with watermarking and overlay triggers to deter screen capture and DevTools usage.

---

## 🔴 Live Demo

[🌐 View Live App](https://protectevideo-react-app.netlify.app/)  

---

## 🚀 Project Features

- 🎥 Renders video inside an HTML5 `<canvas>`
- 🏷️ **Dynamic watermark**: user email + timestamp that moves every 2–3 seconds
- ⛔ Prevents:
  - Right-click context menu
  - `PrintScreen` key press (triggers overlay)
  - `Ctrl+Shift+I`, `Ctrl+U`, `Ctrl+S` (triggers overlay + pauses)
- 🕶️ **Black overlay** + auto-pause for 3s upon suspicious activity
- 🔁 Video served through a **Node.js/Express** backend via HTTP `Range` streaming
- 🌍 Uses `.env` variable to load video source dynamically from the server

---

## ⚙️ Tech Stack

- **Frontend:** React (with Canvas API)
- **Backend:** Node.js + Express
- **Video Streaming:** HTTP Range header support
- **Security:** Canvas rendering, user event listeners, obfuscation

---

## 🧪 How It Works

- The frontend renders the video onto a `<canvas>`, not directly via `<video>`, making it harder to right-click/save.
- A dynamic watermark is drawn onto the canvas repeatedly using `requestAnimationFrame`.
- If users press `PrintScreen`, `Ctrl+Shift+I`, or try to save/view source, a full black overlay appears for 3 seconds and pauses the video.

---

## 📦 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/canvas-video-protect.git
cd canvas-video-protect
```


### 2️⃣  Setup Server

```bash
cd screenshot-server
npm install
```


✅ Place your video at:

```bash
server/assets/protected_video.mp4
```

Then run the server: 

```bash
node server.js
```

### 3️⃣ Setup Client 

```bash
cd screenshot_client
npm install
```


Update your .env file :

```bash
VITE_VIDEO_SERVER_URL=http://localhost:3000/video 
```

Start the React App: 

```bash
npm run dev
```



## 🔐 Limitations

> ❗ **Browser-based protection has significant limitations.**

- 🖨️ `PrintScreen` cannot truly be blocked — browsers don't expose OS-level screen capture events.
- 🛠️ DevTools can be opened indirectly or via alternative shortcuts.
- 🎥 External screen recorders (e.g., OBS, Snagit) **cannot be detected or blocked**.
- 🖼️ Canvas obfuscation and overlay mechanisms help **deter** casual misuse but are **not foolproof**.

---

## 🧠 Future Ideas

- 🔐 **JWT token-based authentication** with expiring video URLs
- 💧 **Pixelate or blur effect** applied before/after video pause
- ⚙️ **Use FFmpeg** to embed watermarks directly on video server-side
- 🖥️ **Switch to Electron** and integrate **Widevine DRM** for advanced protection

---

## 🙌 Contributing

Have ideas to improve:

- Dynamic watermarking
- Screenshot detection
- UX obfuscation
- Secure streaming

✨ Pull requests are always welcome!
