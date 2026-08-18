import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="ja-navbar" data-testid="navbar">
      <Link to="/" className="ja-brand">
        💼 JobApply
      </Link>

      <nav className="ja-nav-links">
        <Link to="/" data-testid="nav-apply">
          Apply
        </Link>
        <Link to="/submissions" data-testid="nav-submissions">
          Submissions
        </Link>
      </nav>
    </header>
  );
}
