import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Orders from "./pages/Orders.jsx";
import "./styles.css";

/**
 * GroceryCart — a small but complete grocery shopping app (navbar + product
 * grid + a second route). Everything works EXCEPT the one feature you must
 * BUILD in components/CartManager.jsx (the cart state + quantity + live totals).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m03" (dev menu).
 */
export default function App() {
  return (
    <div className="gc-app" data-testid="grocerycart-app">
      <Navbar />
      <main className="gc-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
