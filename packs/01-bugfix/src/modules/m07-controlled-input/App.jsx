import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Account from "./pages/Account.jsx";
import "./styles.css";

/**
 * ProfileSettings — a small but complete account-settings app (navbar + a
 * profile-edit form with a live preview, plus a read-only Account route).
 * Everything works EXCEPT the one bug you must fix in
 * components/SettingsForm.jsx (a controlled/uncontrolled input problem: the
 * email field is uncontrolled and the change handler writes the wrong field).
 *
 * This app does not render its own <Router>. It expects to be mounted inside a
 * router (the pack dev shell provides one; tests use MemoryRouter). Routes are
 * RELATIVE so the same app works at "/" (tests) and nested in the dev menu.
 */
export default function App() {
  return (
    <div className="ps-app" data-testid="profile-settings-app">
      <Navbar />
      <main className="ps-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="account" element={<Account />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
