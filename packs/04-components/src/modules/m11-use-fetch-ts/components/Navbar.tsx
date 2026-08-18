import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="dl-navbar" data-testid="navbar">
      <Link to="/" className="dl-brand">
        📡 DataLoader
      </Link>

      <nav className="dl-nav-links">
        <Link to="/" data-testid="nav-users">
          Users
        </Link>
        <Link to="/docs" data-testid="nav-docs">
          Docs
        </Link>
      </nav>
    </header>
  );
}
