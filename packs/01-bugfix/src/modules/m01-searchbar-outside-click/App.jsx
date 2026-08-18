import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Saved from "./pages/Saved.jsx";
import HouseDetail from "./pages/HouseDetail.jsx";
import "./styles.css";

/**
 * HouseFinder — a small but complete app (navbar + search + listing grid +
 * detail page + a second route). Everything works EXCEPT the one bug you must
 * fix in components/SearchBar.jsx.
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m01" (dev menu).
 */
export default function App() {
  return (
    <div className="hf-app" data-testid="house-finder-app">
      <Navbar />
      <main className="hf-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="saved" element={<Saved />} />
          <Route path="house/:id" element={<HouseDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
