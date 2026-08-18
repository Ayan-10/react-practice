import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import History from "./pages/History.tsx";
import "./styles.css";

/**
 * RateWidget — a small but complete rating app (navbar + star rating +
 * a second route). Everything works EXCEPT the one feature you must BUILD in
 * components/StarRating.tsx (the typed hover/click star rating).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m12" (dev menu).
 */
export default function App() {
  return (
    <div className="rw-app" data-testid="ratewidget-app">
      <Navbar />
      <main className="rw-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="history" element={<History />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
