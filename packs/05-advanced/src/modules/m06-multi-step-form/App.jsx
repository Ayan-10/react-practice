import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Faq from "./pages/Faq.jsx";
import "./styles.css";

/**
 * ApplyFlow — a small but complete application-form app (navbar + a multi-step
 * wizard on Home + a second FAQ route). Everything works; the feature to build
 * lives in components/Wizard.jsx (the validated 3-step form).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * Routes are RELATIVE (no leading slash) so the same app works at "/" (tests)
 * or nested under "/m06" (dev menu).
 */
export default function App() {
  return (
    <div className="af-app" data-testid="applyflow-app">
      <Navbar />
      <main className="af-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="second" element={<Faq />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
