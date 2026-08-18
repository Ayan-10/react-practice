import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext.jsx";

// The Navbar is a NESTED consumer of the theme context. It reads { theme,
// toggle } via useTheme() — no props are passed down from App. This is the
// whole point of the feature: no prop drilling.
export default function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <header className="ra-navbar" data-testid="navbar">
      <Link to="/" className="ra-brand">
        📖 ReaderApp
      </Link>

      <nav className="ra-nav-links">
        <Link to="/" data-testid="nav-home">
          Home
        </Link>
        <Link to="/library" data-testid="nav-library">
          Library
        </Link>
      </nav>

      <div className="ra-theme-control">
        <span className="ra-theme-label" data-testid="theme-label">
          {theme}
        </span>
        <button
          type="button"
          className="ra-toggle-btn"
          data-testid="toggle-btn"
          onClick={toggle}
        >
          Toggle theme
        </button>
      </div>
    </header>
  );
}
