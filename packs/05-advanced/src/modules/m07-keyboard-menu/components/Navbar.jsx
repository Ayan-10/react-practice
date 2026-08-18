import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="km-navbar" data-testid="navbar">
      <Link to="/" className="km-brand">
        ⌘ QuickCmd
      </Link>

      <nav className="km-nav-links">
        <Link to="/" data-testid="nav-home">
          Home
        </Link>
        <Link to="/second" data-testid="nav-shortcuts">
          Shortcuts
        </Link>
      </nav>
    </header>
  );
}
