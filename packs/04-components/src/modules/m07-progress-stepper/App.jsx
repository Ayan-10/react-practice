import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Help from "./pages/Help.jsx";
import "./styles.css";

/**
 * OnboardWizard — a small but complete onboarding app (navbar + a progress
 * stepper on Home + a second Help route). Everything works; the feature to
 * build lives in components/Stepper.jsx (the progress bar + back/next flow).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m07" (dev menu).
 */
export default function App() {
  return (
    <div className="ow-app" data-testid="stepper-app">
      <Navbar />
      <main className="ow-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="second" element={<Help />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
