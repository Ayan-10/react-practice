import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Bestsellers from "./pages/Bestsellers.jsx";
import "./styles.css";

/**
 * BookStore — a small but complete online bookstore (navbar + catalog +
 * a second route). Everything works EXCEPT the one feature you must BUILD in
 * components/BookList.jsx (the sort control + sorting logic).
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * Routes below are RELATIVE (no leading slash) so the same app works whether
 * it's at "/" (tests) or nested under "/m07" (dev menu).
 */
export default function App() {
  return (
    <div className="bs-app" data-testid="bookstore-app">
      <Navbar />
      <main className="bs-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="bestsellers" element={<Bestsellers />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
