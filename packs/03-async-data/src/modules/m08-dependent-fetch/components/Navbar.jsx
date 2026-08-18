import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="td-navbar" data-testid="navbar">
      <Link to="/" className="td-brand">
        🧑‍🤝‍🧑 TeamDirectory
      </Link>

      <nav className="td-nav-links">
        <Link to="/" data-testid="nav-people">
          People
        </Link>
        <Link to="/org" data-testid="nav-org">
          Org
        </Link>
      </nav>
    </header>
  );
}
