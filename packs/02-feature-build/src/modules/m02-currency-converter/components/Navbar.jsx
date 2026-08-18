import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="tw-navbar" data-testid="navbar">
      <Link to="/" className="tw-brand">
        💱 TravelWallet
      </Link>

      <nav className="tw-nav-links">
        <Link to="/" data-testid="nav-convert">
          Convert
        </Link>
        <Link to="/rates" data-testid="nav-rates">
          Rates
        </Link>
      </nav>
    </header>
  );
}
