import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="ft-navbar" data-testid="navbar">
      <Link to="/" className="ft-brand">
        💬 ForumThread
      </Link>

      <nav className="ft-nav-links">
        <Link to="/" data-testid="nav-home">
          Thread
        </Link>
        <Link to="/second" data-testid="nav-rules">
          Rules
        </Link>
      </nav>
    </header>
  );
}
