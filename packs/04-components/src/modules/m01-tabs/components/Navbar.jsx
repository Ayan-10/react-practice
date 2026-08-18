import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="dv-navbar" data-testid="navbar">
      <Link to="/" className="dv-brand">
        📚 DocsViewer
      </Link>

      <nav className="dv-nav-links">
        <Link to="/" data-testid="nav-docs">
          Docs
        </Link>
        <Link to="/changelog" data-testid="nav-changelog">
          Changelog
        </Link>
      </nav>
    </header>
  );
}
