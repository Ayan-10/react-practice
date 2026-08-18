import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="pw-navbar" data-testid="navbar">
      <Link className="pw-brand" to="/">
        PhotoWall
      </Link>
      <div className="pw-nav-links">
        <Link className="pw-nav-link" data-testid="nav-wall" to="/">
          Wall
        </Link>
        <Link className="pw-nav-link" data-testid="nav-albums" to="/albums">
          Albums
        </Link>
      </div>
    </nav>
  );
}
