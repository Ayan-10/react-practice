import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bb-navbar" data-testid="navbar">
      <Link to="/" className="bb-brand">
        🛒 BudgetBuddy
      </Link>

      <nav className="bb-nav-links">
        <Link to="/" data-testid="nav-shop">
          Shop
        </Link>
        <Link to="/second" data-testid="nav-saved">
          Saved
        </Link>
      </nav>
    </header>
  );
}
