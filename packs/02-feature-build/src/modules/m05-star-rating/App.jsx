import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Ratings from "./pages/Ratings.jsx";
import "./styles.css";

/**
 * MovieRatings — a small but complete film-rating app (navbar + a movie you can
 * rate + a second route). Everything works EXCEPT the one feature you must
 * BUILD in components/StarRating.jsx (the interactive star widget).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m05" (dev menu).
 */
export default function App() {
  return (
    <div className="mr-app" data-testid="movieratings-app">
      <Navbar />
      <main className="mr-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="ratings" element={<Ratings />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
