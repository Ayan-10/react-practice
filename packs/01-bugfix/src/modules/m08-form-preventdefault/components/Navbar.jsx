import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="ns-navbar" data-testid="navbar">
      <Link to="/" className="ns-brand">
        📰 The Dispatch
      </Link>

      <nav className="ns-nav-links">
        <Link to="/">Home</Link>
        <Link to="/subscribers" data-testid="nav-subscribers">
          Subscribers
        </Link>
      </nav>
    </header>
  );
}
