import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="gc-navbar" data-testid="navbar">
      <Link to="/" className="gc-brand">
        🛒 GroceryCart
      </Link>

      <nav className="gc-nav-links">
        <Link to="/" data-testid="nav-shop">
          Shop
        </Link>
        <Link to="/orders" data-testid="nav-orders">
          Orders
        </Link>
      </nav>
    </header>
  );
}
