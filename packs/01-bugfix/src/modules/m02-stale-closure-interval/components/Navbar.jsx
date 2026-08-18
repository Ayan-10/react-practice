import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="ft-navbar" data-testid="navbar">
      <Link to="/" className="ft-brand">
        ⏱️ FocusTimer
      </Link>

      <nav className="ft-nav-links">
        <Link to="/">Timer</Link>
        <Link to="/history" data-testid="nav-history">
          History
        </Link>
      </nav>
    </header>
  );
}
