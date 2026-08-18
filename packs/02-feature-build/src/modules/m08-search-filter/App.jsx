import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import "./styles.css";

/**
 * ContactsApp — a small but complete phone contacts app (navbar + contacts
 * list + a second route). Everything works EXCEPT the one feature you must
 * BUILD in components/ContactList.jsx (the client-side search filter).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m08" (dev menu).
 */
export default function App() {
  return (
    <div className="ca-app" data-testid="contactsapp-app">
      <Navbar />
      <main className="ca-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
