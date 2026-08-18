import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bs-navbar" data-testid="navbar">
      <Link to="/" className="bs-brand" data-testid="nav-catalog">
        📚 BookStore
      </Link>

      <nav className="bs-nav-links">
        <Link to="/" data-testid="nav-catalog-link">
          Catalog
        </Link>
        <Link to="/bestsellers" data-testid="nav-bestsellers">
          Bestsellers
        </Link>
      </nav>
    </header>
  );
}
