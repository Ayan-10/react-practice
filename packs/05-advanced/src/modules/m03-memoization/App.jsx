import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import "./styles.css";

/**
 * PrimeLab — a small but complete perf-demo app (navbar + prime counter on Home
 * + a second About route). Everything works; the feature to build lives in
 * components/PrimeList.jsx (the useMemo / useCallback / React.memo demo).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * Routes are RELATIVE (no leading slash) so the same app works at "/" (tests)
 * or nested under "/m03" (dev menu).
 */
export default function App() {
  return (
    <div className="ml-app" data-testid="primelab-app">
      <Navbar />
      <main className="ml-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="second" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
