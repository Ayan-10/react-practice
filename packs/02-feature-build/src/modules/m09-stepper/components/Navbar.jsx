import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="cf-navbar" data-testid="navbar">
      <Link to="/" className="cf-brand">
        🛒 CheckoutFlow
      </Link>

      <nav className="cf-nav-links">
        <Link to="/" data-testid="nav-cart">
          Cart
        </Link>
        <Link to="/orders" data-testid="nav-orders">
          Orders
        </Link>
      </nav>
    </header>
  );
}
