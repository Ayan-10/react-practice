import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import "./styles.css";

/**
 * WeatherDash — a small but complete weather dashboard (navbar + city picker +
 * weather panel + a favorites route). Everything works EXCEPT the one bug you
 * must fix in components/WeatherPanel.jsx.
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m05" (dev menu).
 */
export default function App() {
  return (
    <div className="wd-app" data-testid="weather-app">
      <Navbar />
      <main className="wd-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
