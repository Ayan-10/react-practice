import { Link } from "react-router-dom";

// Top navigation for the BlogList mini-app.
export default function Navbar() {
  return (
    <header className="bl-navbar" data-testid="navbar">
      <Link to="/" className="bl-brand">
        BlogList
      </Link>
      <nav className="bl-nav">
        <Link to="/" data-testid="nav-posts" className="bl-nav-link">
          Posts
        </Link>
        <Link to="/about" data-testid="nav-about" className="bl-nav-link">
          About
        </Link>
      </nav>
    </header>
  );
}
