import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";

export default function Navbar() {
  return (
    <header className="hf-navbar" data-testid="navbar">
      <Link to="/" className="hf-brand">
        🏠 HouseFinder
      </Link>

      <SearchBar />

      <nav className="hf-nav-links">
        <Link to="/">Explore</Link>
        <Link to="/saved" data-testid="nav-saved">
          Saved
        </Link>
      </nav>
    </header>
  );
}
