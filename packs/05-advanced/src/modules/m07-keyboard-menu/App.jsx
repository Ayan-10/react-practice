import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Shortcuts from "./pages/Shortcuts.jsx";
import "./styles.css";

/**
 * QuickCmd — a small but complete command-palette app (navbar + a keyboard
 * navigable menu on Home + a second Shortcuts route). Everything works; the
 * feature to build lives in components/Menu.jsx (the roving-focus listbox).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * Routes are RELATIVE (no leading slash) so the same app works at "/" (tests)
 * or nested under "/m07" (dev menu).
 */
export default function App() {
  return (
    <div className="km-app" data-testid="quickcmd-app">
      <Navbar />
      <main className="km-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="second" element={<Shortcuts />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
