import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="cg-navbar" data-testid="navbar">
      <Link to="/" className="cg-brand">
        🖼️ SnapGallery
      </Link>

      <nav className="cg-nav-links">
        <Link to="/" data-testid="nav-home">
          Home
        </Link>
        <Link to="/second" data-testid="nav-albums">
          Albums
        </Link>
      </nav>
    </header>
  );
}
