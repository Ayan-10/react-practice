import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="se-navbar" data-testid="navbar">
      <Link to="/" className="se-brand">
        ⚙️ SettingsTabs
      </Link>

      <nav className="se-nav-links">
        <Link to="/" data-testid="nav-settings">
          Settings
        </Link>
        <Link to="/account" data-testid="nav-account">
          Account
        </Link>
      </nav>
    </header>
  );
}
