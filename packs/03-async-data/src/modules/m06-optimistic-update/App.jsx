import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Trending from "./pages/Trending.jsx";
import "./styles.css";

/**
 * SocialLikes — a small but complete social feed app (navbar + post grid +
 * a second route). Everything works EXCEPT the one feature you must BUILD in
 * components/LikeButton.jsx (the optimistic like with rollback).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m06" (dev menu).
 */
export default function App() {
  return (
    <div className="sl-app" data-testid="sociallikes-app">
      <Navbar />
      <main className="sl-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="trending" element={<Trending />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
