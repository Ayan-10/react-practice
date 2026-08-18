import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="hb-navbar" data-testid="navbar">
      <Link to="/" className="hb-brand">
        🪝 HookBox
      </Link>

      <nav className="hb-nav-links">
        <Link to="/" data-testid="nav-home">
          Home
        </Link>
        <Link to="/second" data-testid="nav-about">
          About
        </Link>
      </nav>
    </header>
  );
}
