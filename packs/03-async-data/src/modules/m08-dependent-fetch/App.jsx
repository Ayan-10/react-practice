import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Org from "./pages/Org.jsx";
import "./styles.css";

/**
 * TeamDirectory — a small but complete team directory app (navbar + member
 * browser + a second route). Everything works EXCEPT the one feature you must
 * BUILD in components/DependentFetch.jsx (the dependent user → posts fetch).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m08" (dev menu).
 */
export default function App() {
  return (
    <div className="td-app" data-testid="teamdirectory-app">
      <Navbar />
      <main className="td-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="org" element={<Org />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
