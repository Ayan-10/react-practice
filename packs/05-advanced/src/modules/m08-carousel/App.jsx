import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Albums from "./pages/Albums.jsx";
import "./styles.css";

/**
 * SnapGallery — a small but complete gallery app (navbar + a carousel on Home
 * + a second Albums route). Everything works; the feature to build lives in
 * components/Carousel.jsx (the wrap-around image carousel).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * Routes are RELATIVE (no leading slash) so the same app works at "/" (tests)
 * or nested under "/m08" (dev menu).
 */
export default function App() {
  return (
    <div className="cg-app" data-testid="snapgallery-app">
      <Navbar />
      <main className="cg-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="second" element={<Albums />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
