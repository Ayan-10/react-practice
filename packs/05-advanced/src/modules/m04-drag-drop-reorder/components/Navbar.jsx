import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="df-navbar" data-testid="navbar">
      <Link to="/" className="df-brand">
        📋 TaskFlow
      </Link>

      <nav className="df-nav-links">
        <Link to="/" data-testid="nav-home">
          Board
        </Link>
        <Link to="/second" data-testid="nav-archive">
          Archive
        </Link>
      </nav>
    </header>
  );
}
