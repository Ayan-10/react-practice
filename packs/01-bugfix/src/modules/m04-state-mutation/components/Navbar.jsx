import { Link } from "react-router-dom";

export default function Navbar({ count = 0 }) {
  return (
    <header className="pl-navbar" data-testid="navbar">
      <Link to="/" className="pl-brand" data-testid="nav-home">
        🎧 PlaylistBuilder
      </Link>

      <nav className="pl-nav-links">
        <Link to="/">Library</Link>
        <span className="pl-nav-count" data-testid="nav-count">
          Playlist · {count}
        </span>
      </nav>
    </header>
  );
}
