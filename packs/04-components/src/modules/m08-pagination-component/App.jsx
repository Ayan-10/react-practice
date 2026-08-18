import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Saved from "./pages/Saved.jsx";
import "./styles.css";

/**
 * SearchResults — a small but complete results-browser app (navbar + a paged
 * results list on Home + a second Saved route). Everything works; the feature
 * to build lives in components/Pagination.jsx (the windowed page control).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m08" (dev menu).
 */
export default function App() {
  return (
    <div className="sr-app" data-testid="pagination-app">
      <Navbar />
      <main className="sr-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="second" element={<Saved />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
