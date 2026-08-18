import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Orders from "./pages/Orders.jsx";
import "./styles.css";

/**
 * CheckoutFlow — a small but complete checkout app (navbar + checkout screen +
 * a second route). Everything works EXCEPT the one feature you must BUILD in
 * components/CheckoutWizard.jsx (the 3-step wizard + validation + submit).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * Routes below are RELATIVE (no leading slash) so the same app works whether
 * it's at "/" (tests) or nested under "/m09" (dev menu).
 */
export default function App() {
  return (
    <div className="cf-app" data-testid="checkoutflow-app">
      <Navbar />
      <main className="cf-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
