import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="tb-navbar" data-testid="navbar">
      <Link to="/" className="tb-brand">
        📋 TaskBoard
      </Link>

      <nav className="tb-nav-links">
        <Link to="/">Board</Link>
        <Link to="/archive" data-testid="nav-archive">
          Archive
        </Link>
      </nav>
    </header>
  );
}
