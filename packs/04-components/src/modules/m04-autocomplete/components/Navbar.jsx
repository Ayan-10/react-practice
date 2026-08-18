import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="cp-navbar" data-testid="navbar">
      <Link to="/" className="cp-brand">
        ⌘ CommandPalette
      </Link>

      <nav className="cp-nav-links">
        <Link to="/" data-testid="nav-palette">
          Palette
        </Link>
        <Link to="/shortcuts" data-testid="nav-shortcuts">
          Shortcuts
        </Link>
      </nav>
    </header>
  );
}
