import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sr-navbar" data-testid="navbar">
      <Link to="/" className="sr-brand">
        🔎 SearchResults
      </Link>

      <nav className="sr-nav-links">
        <Link to="/" data-testid="nav-home">
          Results
        </Link>
        <Link to="/second" data-testid="nav-saved">
          Saved
        </Link>
      </nav>
    </header>
  );
}
