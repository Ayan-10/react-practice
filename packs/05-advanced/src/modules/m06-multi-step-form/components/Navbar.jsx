import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="af-navbar" data-testid="navbar">
      <Link to="/" className="af-brand">
        📝 ApplyFlow
      </Link>

      <nav className="af-nav-links">
        <Link to="/" data-testid="nav-home">
          Home
        </Link>
        <Link to="/second" data-testid="nav-faq">
          FAQ
        </Link>
      </nav>
    </header>
  );
}
