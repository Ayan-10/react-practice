import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="lf-navbar" data-testid="navbar">
      <Link to="/" className="lf-brand">
        📡 LiveFeed
      </Link>

      <nav className="lf-nav-links">
        <Link to="/" data-testid="nav-home">
          Live
        </Link>
        <Link to="/archive" data-testid="nav-archive">
          Archive
        </Link>
      </nav>
    </header>
  );
}
