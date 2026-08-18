import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fq-navbar" data-testid="navbar">
      <Link to="/" className="fq-brand">
        ❓ FaqPage
      </Link>

      <nav className="fq-nav-links">
        <Link to="/" data-testid="nav-faq">
          FAQ
        </Link>
        <Link to="/contact" data-testid="nav-contact">
          Contact
        </Link>
      </nav>
    </header>
  );
}
