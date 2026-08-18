import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="ml-navbar" data-testid="navbar">
      <Link to="/" className="ml-brand">
        🔢 PrimeLab
      </Link>

      <nav className="ml-nav-links">
        <Link to="/" data-testid="nav-home">
          Lab
        </Link>
        <Link to="/second" data-testid="nav-about">
          About
        </Link>
      </nav>
    </header>
  );
}
