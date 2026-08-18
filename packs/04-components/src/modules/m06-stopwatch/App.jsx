import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Workouts from "./pages/Workouts.jsx";
import "./styles.css";

/**
 * GymTimer — a small but complete workout-timer app (navbar + a stopwatch on
 * Home + a second Workouts route). Everything works; the feature to build lives
 * in components/Stopwatch.jsx (the interval-driven start / stop / reset timer).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m06" (dev menu).
 */
export default function App() {
  return (
    <div className="gt-app" data-testid="stopwatch-app">
      <Navbar />
      <main className="gt-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="second" element={<Workouts />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
