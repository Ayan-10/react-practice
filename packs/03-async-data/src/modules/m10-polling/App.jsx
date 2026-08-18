import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import History from "./pages/History.jsx";
import "./styles.css";

/**
 * StatusMonitor — a small but complete uptime dashboard app (navbar + a live
 * value + a second route). Everything works EXCEPT the one feature you must
 * BUILD in components/Poller.jsx (the interval polling with cleanup).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m10" (dev menu).
 */
export default function App() {
  return (
    <div className="sm-app" data-testid="statusmonitor-app">
      <Navbar />
      <main className="sm-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="history" element={<History />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
