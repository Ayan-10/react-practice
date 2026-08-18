import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import History from "./pages/History.jsx";
import "./styles.css";

/**
 * FocusTimer — a small but complete Pomodoro / focus-timer app (navbar + timer
 * panel + preset chips + a session list + a second route). Everything works
 * EXCEPT the one bug you must fix in components/TimerPanel.jsx.
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m02" (dev menu).
 */
export default function App() {
  return (
    <div className="ft-app" data-testid="focus-timer-app">
      <Navbar />
      <main className="ft-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="history" element={<History />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
