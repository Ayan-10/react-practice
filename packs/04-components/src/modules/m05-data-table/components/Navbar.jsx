import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="st-navbar" data-testid="navbar">
      <Link to="/" className="st-brand">
        📊 SalesTable
      </Link>

      <nav className="st-nav-links">
        <Link to="/" data-testid="nav-table">
          Table
        </Link>
        <Link to="/summary" data-testid="nav-summary">
          Summary
        </Link>
      </nav>
    </header>
  );
}
