import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Reports from "./pages/Reports.jsx";
import "./styles.css";

/**
 * ExpenseTracker — a small but complete personal-finance app (navbar + expenses
 * page with a category filter + add form + total, plus a Reports route).
 * Everything works EXCEPT the one bug you must fix in components/ExpenseList.jsx
 * (derived state stored in state — the list and total go stale on Add).
 *
 * This app does not render its own <Router>. It expects to be mounted inside a
 * router (the pack dev shell provides one; tests use MemoryRouter). Routes are
 * RELATIVE so the same app works at "/" (tests) and nested in the dev menu.
 */
export default function App() {
  return (
    <div className="et-app" data-testid="expense-tracker-app">
      <Navbar />
      <main className="et-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
