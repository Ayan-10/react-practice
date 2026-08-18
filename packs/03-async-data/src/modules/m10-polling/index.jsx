// Entry point for the m10 mini-app (StatusMonitor).
// The whole project lives in this folder:
//   App.jsx                – app root (layout + routes)
//   components/            – Navbar, Poller (👈 BUILD here), StatusCard, Footer
//   pages/                 – Home, History
//   data/status.js         – local dataset + default load() (offline)
//   styles.css
//
// 👉 The feature to build lives in components/Poller.jsx. Read PROMPT.md.
export { default } from "./App.jsx";
