import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import Docs from "./pages/Docs.tsx";
import "./styles.css";

/**
 * DataLoader — a small but complete data-fetching app (navbar + user list +
 * a second route). Everything works EXCEPT the one feature you must BUILD in
 * components/UserList.tsx (the generic useFetch hook + its typed consumer).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m11" (dev menu).
 */
export default function App() {
  return (
    <div className="dl-app" data-testid="dataloader-app">
      <Navbar />
      <main className="dl-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="docs" element={<Docs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
