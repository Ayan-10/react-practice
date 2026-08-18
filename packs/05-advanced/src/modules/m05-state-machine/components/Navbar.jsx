import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sm-navbar" data-testid="navbar">
      <Link to="/" className="sm-brand">
        🚦 CrossWalk
      </Link>

      <nav className="sm-nav-links">
        <Link to="/" data-testid="nav-home">
          Home
        </Link>
        <Link to="/second" data-testid="nav-rules">
          Rules
        </Link>
      </nav>
    </header>
  );
}
