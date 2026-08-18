import { Link } from "react-router-dom";
import { WORKOUTS } from "../data/workouts.js";

// A second real route so navigation works — a simple list of workouts.
export default function Workouts() {
  return (
    <section className="gt-page" data-testid="workouts-page">
      <Link to="/" className="gt-back" data-testid="back-home">
        ← Back to timer
      </Link>
      <h1 className="gt-page-title">Today's workouts</h1>
      <p className="gt-page-sub">{WORKOUTS.length} exercises</p>
      <ul className="gt-list">
        {WORKOUTS.map((w) => (
          <li key={w.id} className="gt-list-item">
            <span className="gt-list-name">{w.name}</span>
            <span className="gt-list-meta">{w.minutes} min</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
