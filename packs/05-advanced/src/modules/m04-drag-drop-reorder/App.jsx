import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Archive from "./pages/Archive.jsx";
import "./styles.css";

/**
 * TaskFlow — a small but complete task-board app (navbar + a reorderable list
 * on Home + a second Archive route). Everything works; the feature to build
 * lives in components/ReorderList.jsx (the HTML5 drag-and-drop reordering).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * Routes are RELATIVE (no leading slash) so the same app works at "/" (tests)
 * or nested under "/m04" (dev menu).
 */
export default function App() {
  return (
    <div className="df-app" data-testid="taskflow-app">
      <Navbar />
      <main className="df-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="second" element={<Archive />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
