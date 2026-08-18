import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import "./styles.css";

/**
 * ShopFilters — a small but complete product-catalog app (navbar + product grid
 * + a filters panel + a detail page + a second route). Everything works EXCEPT
 * the one bug you must fix in components/ProductFilters.jsx.
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m03" (dev menu).
 */
export default function App() {
  return (
    <div className="pf-app" data-testid="product-filters-app">
      <Navbar />
      <main className="pf-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
