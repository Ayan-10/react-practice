import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Saved from "./pages/Saved.jsx";
import "./styles.css";

/**
 * BudgetBuddy — a small but complete shop app (navbar + catalogue/cart on Home
 * + a second Saved route). Everything works; the feature to build lives in
 * components/Cart.jsx (the useReducer-driven cart).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * Routes are RELATIVE (no leading slash) so the same app works at "/" (tests)
 * or nested under "/m01" (dev menu).
 */
export default function App() {
  return (
    <div className="bb-app" data-testid="budgetbuddy-app">
      <Navbar />
      <main className="bb-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="second" element={<Saved />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
