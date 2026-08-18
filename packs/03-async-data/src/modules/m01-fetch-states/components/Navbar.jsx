import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="ss-navbar" data-testid="navbar">
      <Link to="/" className="ss-brand">
        👟 SneakerShop
      </Link>

      <nav className="ss-nav-links">
        <Link to="/" data-testid="nav-shop">
          Shop
        </Link>
        <Link to="/deals" data-testid="nav-deals">
          Deals
        </Link>
      </nav>
    </header>
  );
}
