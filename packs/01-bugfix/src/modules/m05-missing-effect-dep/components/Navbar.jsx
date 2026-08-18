import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="wd-navbar" data-testid="navbar">
      <Link to="/" className="wd-brand">
        🌦️ WeatherDash
      </Link>

      <nav className="wd-nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/favorites" data-testid="nav-favorites">
          Favorites
        </Link>
      </nav>
    </header>
  );
}
