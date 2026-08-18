import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="rw-navbar" data-testid="navbar">
      <Link to="/" className="rw-brand">
        ⭐ RateWidget
      </Link>

      <nav className="rw-nav-links">
        <Link to="/" data-testid="nav-rate">
          Rate
        </Link>
        <Link to="/history" data-testid="nav-history">
          History
        </Link>
      </nav>
    </header>
  );
}
