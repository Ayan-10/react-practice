import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import SongDetail from "./pages/SongDetail.jsx";
import "./styles.css";

/**
 * PlaylistBuilder — a small but complete music app (navbar + song library +
 * a live playlist panel + a song detail route). Everything works EXCEPT the
 * one bug you must fix in components/PlaylistPanel.jsx.
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m04" (dev menu).
 *
 * The playlist itself is lifted here into App state so the Home page (library +
 * panel) and any child can share it.
 */
export default function App() {
  const [playlist, setPlaylist] = useState([]);

  return (
    <div className="pl-app" data-testid="playlist-app">
      <Navbar count={playlist.length} />
      <main className="pl-main">
        <Routes>
          <Route
            index
            element={
              <Home
                playlist={playlist}
                setPlaylist={setPlaylist}
              />
            }
          />
          <Route path="song/:id" element={<SongDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
