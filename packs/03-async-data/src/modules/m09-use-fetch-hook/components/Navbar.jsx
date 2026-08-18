import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="cs-navbar" data-testid="navbar">
      <Link to="/" className="cs-brand">
        🌍 CountryStats
      </Link>

      <nav className="cs-nav-links">
        <Link to="/" data-testid="nav-countries">
          Countries
        </Link>
        <Link to="/about" data-testid="nav-about">
          About
        </Link>
      </nav>
    </header>
  );
}
