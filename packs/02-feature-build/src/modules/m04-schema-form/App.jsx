import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Submissions from "./pages/Submissions.jsx";
import "./styles.css";

/**
 * JobApply — a small but complete job-application app (navbar + apply form +
 * a second route). Everything works EXCEPT the one feature you must BUILD in
 * components/SchemaForm.jsx (the schema-driven form + validation + submit).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m04" (dev menu).
 */
export default function App() {
  return (
    <div className="ja-app" data-testid="jobapply-app">
      <Navbar />
      <main className="ja-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="submissions" element={<Submissions />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
