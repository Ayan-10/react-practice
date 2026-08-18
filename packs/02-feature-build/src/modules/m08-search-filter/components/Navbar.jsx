import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="ca-navbar" data-testid="navbar">
      <Link to="/" className="ca-brand">
        📇 ContactsApp
      </Link>

      <nav className="ca-nav-links">
        <Link to="/" data-testid="nav-all">
          All
        </Link>
        <Link to="/favorites" data-testid="nav-favorites">
          Favorites
        </Link>
      </nav>
    </header>
  );
}
