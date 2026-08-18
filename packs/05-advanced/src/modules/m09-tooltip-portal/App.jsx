import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Docs from "./pages/Docs.jsx";
import "./styles.css";

/**
 * HelpHint — a small but complete help-UI app (navbar + hover/focus tooltips on
 * Home + a second Docs route). Everything works; the feature to build lives in
 * components/Tooltip.jsx (a portal-rendered tooltip shown on hover AND focus).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * Routes are RELATIVE (no leading slash) so the same app works at "/" (tests)
 * or nested under "/m09" (dev menu).
 */
export default function App() {
  return (
    <div className="hh-app" data-testid="helphint-app">
      <Navbar />
      <main className="hh-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="second" element={<Docs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
