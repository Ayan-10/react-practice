import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="gs-navbar" data-testid="navbar">
      <Link className="gs-brand" to="/">
        GifSearch
      </Link>
      <div className="gs-nav-links">
        <Link className="gs-nav-link" data-testid="nav-search" to="/">
          Search
        </Link>
        <Link className="gs-nav-link" data-testid="nav-trending" to="/trending">
          Trending
        </Link>
      </div>
    </nav>
  );
}
