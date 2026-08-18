import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="ow-navbar" data-testid="navbar">
      <Link to="/" className="ow-brand">
        🧭 OnboardWizard
      </Link>

      <nav className="ow-nav-links">
        <Link to="/" data-testid="nav-home">
          Setup
        </Link>
        <Link to="/second" data-testid="nav-help">
          Help
        </Link>
      </nav>
    </header>
  );
}
