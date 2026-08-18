// Entry point for the m09 mini-app (LiveFeed).
// The whole project lives in this folder:
//   App.jsx           – app root (layout + routes)
//   components/        – Navbar, FeedTicker (🐞 fix here), Footer
//   pages/            – Home (live ticker + pause toggle), Archive
//   data/feed.js      – local pub/sub event source (offline)
//   styles.css
//
// 👉 The bug to fix lives in components/FeedTicker.jsx. Read PROMPT.md.
export { default } from "./App.jsx";
