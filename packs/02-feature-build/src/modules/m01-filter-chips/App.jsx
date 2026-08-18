import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Saved from "./pages/Saved.jsx";
import "./styles.css";

/**
 * StayFinder — a small but complete short-stay rentals app (navbar + listing
 * grid + a second route). Everything works EXCEPT the one feature you must
 * BUILD in components/FilterChips.jsx (the filter chips + filtering logic).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m01" (dev menu).
 */
export default function App() {
  return (
    <div className="sf-app" data-testid="stayfinder-app">
      <Navbar />
      <main className="sf-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="saved" element={<Saved />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
