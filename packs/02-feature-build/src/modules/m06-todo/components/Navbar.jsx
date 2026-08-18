import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="dp-navbar" data-testid="navbar">
      <Link to="/" className="dp-brand">
        🗓️ DailyPlanner
      </Link>

      <nav className="dp-nav-links">
        <Link to="/" data-testid="nav-today">
          Today
        </Link>
        <Link to="/about" data-testid="nav-about">
          About
        </Link>
      </nav>
    </header>
  );
}
