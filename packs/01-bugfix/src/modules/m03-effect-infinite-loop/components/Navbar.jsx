import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="pf-navbar" data-testid="navbar">
      <Link to="/" className="pf-brand">
        🛍️ ShopFilters
      </Link>

      <nav className="pf-nav-links">
        <Link to="/">Catalog</Link>
        <Link to="/product/p1" data-testid="nav-featured">
          Featured
        </Link>
      </nav>
    </header>
  );
}
