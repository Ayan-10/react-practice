import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Rules from "./pages/Rules.jsx";
import "./styles.css";

/**
 * CrossWalk — a small but complete pedestrian-crossing app (navbar + a traffic
 * light on Home + a second Rules route). Everything works; the feature to build
 * lives in components/TrafficLight.jsx (the finite state machine).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * Routes are RELATIVE (no leading slash) so the same app works at "/" (tests)
 * or nested under "/m05" (dev menu).
 */
export default function App() {
  return (
    <div className="sm-app" data-testid="crosswalk-app">
      <Navbar />
      <main className="sm-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="second" element={<Rules />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
