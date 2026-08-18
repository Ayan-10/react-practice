import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Subscribers from "./pages/Subscribers.jsx";
import "./styles.css";

/**
 * NewsletterSignup — a small but complete marketing site (navbar + hero +
 * signup form + a subscribers page + a second route). Everything works EXCEPT
 * the one bug you must fix in components/SignupForm.jsx.
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m08" (dev menu).
 */
export default function App() {
  return (
    <div className="ns-app" data-testid="newsletter-app">
      <Navbar />
      <main className="ns-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="subscribers" element={<Subscribers />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
