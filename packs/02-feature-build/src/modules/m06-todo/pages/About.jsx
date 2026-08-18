import { Link } from "react-router-dom";

// A second real route so navigation works. Proves the app is a full mini-app,
// not a single screen.
export default function About() {
  return (
    <section className="dp-page" data-testid="about-page">
      <Link to="/" className="dp-back" data-testid="back-home">
        ← Back to today
      </Link>
      <h1 className="dp-page-title">About DailyPlanner</h1>
      <p className="dp-page-sub">
        A tiny task planner for interview practice. Add tasks, check them off,
        delete them, and filter by All / Active / Completed.
      </p>
    </section>
  );
}
