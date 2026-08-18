import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="gt-navbar" data-testid="navbar">
      <Link to="/" className="gt-brand">
        ⏱️ GymTimer
      </Link>

      <nav className="gt-nav-links">
        <Link to="/" data-testid="nav-home">
          Timer
        </Link>
        <Link to="/second" data-testid="nav-workouts">
          Workouts
        </Link>
      </nav>
    </header>
  );
}
