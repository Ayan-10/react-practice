import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Changelog from "./pages/Changelog.jsx";
import "./styles.css";

/**
 * DocsViewer — a small but complete docs app (navbar + tabbed content +
 * a second route). The feature lives in components/Tabs.jsx.
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * Routes are RELATIVE (no leading slash) so the same app works at "/" (tests)
 * or nested under "/m01" (dev menu).
 */
export default function App() {
  return (
    <div className="dv-app" data-testid="docsviewer-app">
      <Navbar />
      <main className="dv-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="changelog" element={<Changelog />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
