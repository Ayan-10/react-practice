import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Rules from "./pages/Rules.jsx";
import "./styles.css";

/**
 * ForumThread — a small but complete discussion app (navbar + a nested comment
 * thread on Home + a second Rules route). Everything works; the feature to
 * build lives in components/Comments.jsx (the recursive, collapsible tree).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m09" (dev menu).
 */
export default function App() {
  return (
    <div className="ft-app" data-testid="comments-app">
      <Navbar />
      <main className="ft-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="second" element={<Rules />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
