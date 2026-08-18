import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import "./styles.css";

/**
 * CountryStats — a small but complete country facts app (navbar + country list
 * + a second route). Everything works EXCEPT the one feature you must BUILD in
 * components/UserList.jsx (the reusable useFetch hook + list).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m09" (dev menu).
 */
export default function App() {
  return (
    <div className="cs-app" data-testid="countrystats-app">
      <Navbar />
      <main className="cs-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
