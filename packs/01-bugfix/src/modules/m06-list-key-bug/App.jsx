import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Archive from "./pages/Archive.jsx";
import "./styles.css";

/**
 * TaskBoard — a small but complete task-list app (navbar + task board with
 * per-row checkboxes + delete + a second Archive route). Everything works
 * EXCEPT the one bug you must fix in components/TaskList.jsx.
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m06" (dev menu).
 */
export default function App() {
  return (
    <div className="tb-app" data-testid="task-board-app">
      <Navbar />
      <main className="tb-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="archive" element={<Archive />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
