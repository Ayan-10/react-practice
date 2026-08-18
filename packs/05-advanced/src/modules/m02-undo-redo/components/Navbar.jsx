import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="ur-navbar" data-testid="navbar">
      <Link to="/" className="ur-brand">
        ✏️ SketchPad
      </Link>

      <nav className="ur-nav-links">
        <Link to="/" data-testid="nav-home">
          Editor
        </Link>
        <Link to="/second" data-testid="nav-history">
          History
        </Link>
      </nav>
    </header>
  );
}
