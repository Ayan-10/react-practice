import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Shortcuts from "./pages/Shortcuts.jsx";
import "./styles.css";

/**
 * CommandPalette — a small but complete command-search app (navbar +
 * autocomplete + a second route). The feature lives in
 * components/Autocomplete.jsx.
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (dev shell provides one; tests use MemoryRouter). Routes are
 * RELATIVE so the same app works at "/" (tests) or nested under "/m04".
 */
export default function App() {
  return (
    <div className="cp-app" data-testid="commandpalette-app">
      <Navbar />
      <main className="cp-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="shortcuts" element={<Shortcuts />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
