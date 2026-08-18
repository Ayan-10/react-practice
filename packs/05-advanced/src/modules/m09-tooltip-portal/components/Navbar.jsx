import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="hh-navbar" data-testid="navbar">
      <Link to="/" className="hh-brand">
        💡 HelpHint
      </Link>

      <nav className="hh-nav-links">
        <Link to="/" data-testid="nav-home">
          Home
        </Link>
        <Link to="/second" data-testid="nav-docs">
          Docs
        </Link>
      </nav>
    </header>
  );
}
