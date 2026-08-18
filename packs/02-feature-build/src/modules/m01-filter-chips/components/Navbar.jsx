import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sf-navbar" data-testid="navbar">
      <Link to="/" className="sf-brand">
        🏝️ StayFinder
      </Link>

      <nav className="sf-nav-links">
        <Link to="/" data-testid="nav-explore">
          Explore
        </Link>
        <Link to="/saved" data-testid="nav-saved">
          Saved
        </Link>
      </nav>
    </header>
  );
}
