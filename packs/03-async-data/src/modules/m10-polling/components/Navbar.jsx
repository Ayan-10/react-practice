import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sm-navbar" data-testid="navbar">
      <Link to="/" className="sm-brand">
        🟢 StatusMonitor
      </Link>

      <nav className="sm-nav-links">
        <Link to="/" data-testid="nav-live">
          Live
        </Link>
        <Link to="/history" data-testid="nav-history">
          History
        </Link>
      </nav>
    </header>
  );
}
