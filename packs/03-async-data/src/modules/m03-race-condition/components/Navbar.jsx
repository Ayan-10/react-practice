import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="ce-navbar" data-testid="navbar">
      <Link className="ce-brand" to="/">CityExplorer</Link>
      <div className="ce-nav-links">
        <Link className="ce-nav-link" data-testid="nav-explore" to="/">Explore</Link>
        <Link className="ce-nav-link" data-testid="nav-favorites" to="/favorites">Favorites</Link>
      </div>
    </nav>
  );
}
