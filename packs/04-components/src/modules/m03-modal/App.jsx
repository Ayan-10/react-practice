import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Albums from "./pages/Albums.jsx";
import "./styles.css";

/**
 * ImageGallery — a small but complete gallery app (navbar + modal lightbox +
 * a second route). The feature lives in components/Modal.jsx.
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (dev shell provides one; tests use MemoryRouter). Routes are
 * RELATIVE so the same app works at "/" (tests) or nested under "/m03".
 */
export default function App() {
  return (
    <div className="ig-app" data-testid="imagegallery-app">
      <Navbar />
      <main className="ig-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="albums" element={<Albums />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
