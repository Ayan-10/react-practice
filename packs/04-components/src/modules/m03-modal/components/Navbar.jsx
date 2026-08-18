import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="ig-navbar" data-testid="navbar">
      <Link to="/" className="ig-brand">
        🖼️ ImageGallery
      </Link>

      <nav className="ig-nav-links">
        <Link to="/" data-testid="nav-gallery">
          Gallery
        </Link>
        <Link to="/albums" data-testid="nav-albums">
          Albums
        </Link>
      </nav>
    </header>
  );
}
