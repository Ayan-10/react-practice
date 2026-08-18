import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Archive from "./pages/Archive.jsx";
import "./styles.css";

/**
 * LiveFeed — a small but complete live-activity app (navbar + live ticker +
 * an archive route). Everything works EXCEPT the one bug you must fix in
 * components/FeedTicker.jsx (a subscription with no cleanup — a memory leak).
 *
 * This app does not render its own <Router>. It expects to be mounted inside a
 * router (the pack dev shell provides one; tests use MemoryRouter). Routes are
 * RELATIVE so the same app works at "/" (tests) and nested in the dev menu.
 */
export default function App() {
  return (
    <div className="lf-app" data-testid="live-feed-app">
      <Navbar />
      <main className="lf-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="archive" element={<Archive />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
