import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="mr-navbar" data-testid="navbar">
      <Link to="/" className="mr-brand">
        🎬 MovieRatings
      </Link>

      <nav className="mr-nav-links">
        <Link to="/" data-testid="nav-rate">
          Rate
        </Link>
        <Link to="/ratings" data-testid="nav-ratings">
          My Ratings
        </Link>
      </nav>
    </header>
  );
}
