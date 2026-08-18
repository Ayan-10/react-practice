import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="ps-navbar" data-testid="navbar">
      <Link to="/" className="ps-brand">
        ⚙️ ProfileSettings
      </Link>

      <nav className="ps-nav-links">
        <Link to="/" data-testid="nav-profile">
          Profile
        </Link>
        <Link to="/account" data-testid="nav-account">
          Account
        </Link>
      </nav>
    </header>
  );
}
