import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import "./styles.css";

/**
 * CryptoTicker — a small but complete crypto price app (navbar + coin grid +
 * a second route). Everything works EXCEPT the one feature you must BUILD in
 * components/RetryList.jsx (the retry-on-error fetch).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m07" (dev menu).
 */
export default function App() {
  return (
    <div className="ct-app" data-testid="cryptoticker-app">
      <Navbar />
      <main className="ct-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="watchlist" element={<Watchlist />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
