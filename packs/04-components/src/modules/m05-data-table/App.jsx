import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Summary from "./pages/Summary.jsx";
import "./styles.css";

/**
 * SalesTable — a small but complete sortable-table app (navbar + data table +
 * a second route). The feature lives in components/DataTable.jsx.
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (dev shell provides one; tests use MemoryRouter). Routes are
 * RELATIVE so the same app works at "/" (tests) or nested under "/m05".
 */
export default function App() {
  return (
    <div className="st-app" data-testid="salestable-app">
      <Navbar />
      <main className="st-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="summary" element={<Summary />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
