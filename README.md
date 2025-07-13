# 🔒 Canvas Video Player with Watermark and Screenshot Blocking Overlay

This is a simple **React-based canvas video player** that overlays a dynamic watermark and tries to prevent screenshots and screen recording. It uses a combination of `canvas`, a moving watermark, and a fullscreen black overlay triggered on suspicious key events like `PrintScreen` or `Ctrl+Shift+I`.

---

## 🎯 Features

- 🖼️ Renders video on HTML `<canvas>`
- 🏷️ Displays a **moving watermark** (email + time) every 2-3 seconds
- ⛔ Attempts to block:
  - Right-click context menu
  - DevTools shortcut (`Ctrl+Shift+I`)
  - Print Screen key
  - Common shortcut keys like `Ctrl+U`, `Ctrl+S`
- ⚫ Shows a fullscreen black overlay for 3 seconds if such actions are detected

---

## ⚠️ Reality Check: Does It Actually Prevent Screenshots?

Not really.

> **Client-side protection in browser is fundamentally limited.**

Despite the efforts:

- Browser security restrictions don't allow us to detect all screen recordings or screenshots reliably.
- `PrintScreen` cannot be truly intercepted — `keydown` only captures key **press**, not what the OS does.
- Extensions or external screen recorders can still capture the screen.
- DevTools can be opened using indirect methods, or by detaching the window.
- **Overlay only makes it slightly harder**, but not impossible.

This project is more of an **obfuscation** and **deterrence**, not foolproof DRM.

---

## 🔴 Live Demo

[🌐 View Live App](https://your-demo-link.vercel.app)  
_(Replace with your deployed Vercel/Netlify URL)_

---

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/canvas-video-protect.git
cd canvas-video-protect
```
### 2. Install the dependecies

```bash
npm install
```

```bash
npm run dev
```
### 4. Open http://localhost:5173 in your browser.


## 🙌 Contributing

Contributions are **very welcome**!

If you have better ideas to:

- Enhance obfuscation
- Improve watermark logic
- Integrate Electron securely
- Educate users on realistic content protection

Feel free to **fork** the repository and **submit a pull request (PR)**.
