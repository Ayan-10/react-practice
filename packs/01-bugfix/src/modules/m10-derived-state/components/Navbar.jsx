import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="et-navbar" data-testid="navbar">
      <Link to="/" className="et-brand">
        💸 ExpenseTracker
      </Link>

      <nav className="et-nav-links">
        <Link to="/">Expenses</Link>
        <Link to="/reports" data-testid="nav-reports">
          Reports
        </Link>
      </nav>
    </header>
  );
}
