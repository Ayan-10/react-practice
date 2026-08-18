import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import Account from "./pages/Account.tsx";
import "./styles.css";

/**
 * SettingsTabs — a small but complete settings app (navbar + tabbed panels +
 * a second route). Everything works EXCEPT the one feature you must BUILD in
 * components/Tabs.tsx (the typed tab strip).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m10" (dev menu).
 */
export default function App() {
  return (
    <div className="se-app" data-testid="settingstabs-app">
      <Navbar />
      <main className="se-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="account" element={<Account />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
