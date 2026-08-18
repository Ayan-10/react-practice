import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Deals from "./pages/Deals.jsx";
import "./styles.css";

/**
 * SneakerShop — a small but complete sneaker store app (navbar + product grid +
 * a second route). Everything works EXCEPT the one feature you must BUILD in
 * components/ProductList.jsx (the async fetch-states lifecycle).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m01" (dev menu).
 */
export default function App() {
  return (
    <div className="ss-app" data-testid="sneakershop-app">
      <Navbar />
      <main className="ss-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="deals" element={<Deals />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
