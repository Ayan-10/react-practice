import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import History from "./pages/History.jsx";
import "./styles.css";

/**
 * SketchPad — a small but complete value-editor app (navbar + editor on Home
 * + a second History route). Everything works; the feature to build lives in
 * components/History.jsx (the useReducer-driven undo/redo editor).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * Routes are RELATIVE (no leading slash) so the same app works at "/" (tests)
 * or nested under "/m02" (dev menu).
 */
export default function App() {
  return (
    <div className="ur-app" data-testid="sketchpad-app">
      <Navbar />
      <main className="ur-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="second" element={<History />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
