import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sl-navbar" data-testid="navbar">
      <Link to="/" className="sl-brand">
        💬 SocialLikes
      </Link>

      <nav className="sl-nav-links">
        <Link to="/" data-testid="nav-feed">
          Feed
        </Link>
        <Link to="/trending" data-testid="nav-trending">
          Trending
        </Link>
      </nav>
    </header>
  );
}
