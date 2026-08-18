import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Rates from "./pages/Rates.jsx";
import "./styles.css";

/**
 * TravelWallet — a small but complete money-conversion app (navbar + converter
 * screen + a second route). Everything works EXCEPT the one feature you must
 * BUILD in components/CurrencyConverter.jsx (the live conversion logic).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m02" (dev menu).
 */
export default function App() {
  return (
    <div className="tw-app" data-testid="travelwallet-app">
      <Navbar />
      <main className="tw-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="rates" element={<Rates />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
