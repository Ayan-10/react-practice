import { Link } from "react-router-dom";
import { SESSIONS } from "../data/snapshots.js";

// A second real route so navigation works — a log of past edit sessions.
export default function History() {
  return (
    <section className="ur-page" data-testid="history-page">
      <Link to="/" className="ur-back" data-testid="back-home">
        ← Back to editor
      </Link>
      <h1 className="ur-page-title">Edit history</h1>
      <p className="ur-page-sub">{SESSIONS.length} past sessions</p>
      <ul className="ur-session-list">
        {SESSIONS.map((s) => (
          <li key={s.id} className="ur-session-item">
            <span>{s.label}</span>
            <span>{s.edits} edits</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
