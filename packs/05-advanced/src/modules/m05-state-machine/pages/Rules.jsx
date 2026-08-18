import { Link } from "react-router-dom";
import { ORDER, LABELS } from "../data/states.js";

// A second real route so navigation works — the crossing rules per light state.
export default function Rules() {
  return (
    <section className="sm-page" data-testid="rules-page">
      <Link to="/" className="sm-back" data-testid="back-home">
        ← Back to crossing
      </Link>
      <h1 className="sm-page-title">Rules</h1>
      <p className="sm-page-sub">What each light means.</p>
      <ul className="sm-rules-list">
        {ORDER.map((s) => (
          <li key={s} className="sm-rules-item">
            <span className={`sm-dot sm-dot-${s}`} />
            <span className="sm-rules-state">{s}</span>
            <span className="sm-rules-label">{LABELS[s]}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
