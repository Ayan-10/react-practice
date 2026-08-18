import { Link } from "react-router-dom";
import { ARCHIVED } from "../data/tasks.js";

// A second real route so navigation works — previously archived tasks.
export default function Archive() {
  return (
    <section className="df-page" data-testid="archive-page">
      <Link to="/" className="df-back" data-testid="back-home">
        ← Back to board
      </Link>
      <h1 className="df-page-title">Archive</h1>
      <p className="df-page-sub">{ARCHIVED.length} archived tasks</p>
      <ul className="df-archive-list">
        {ARCHIVED.map((t) => (
          <li key={t.id} className="df-archive-item">
            {t.title}
          </li>
        ))}
      </ul>
    </section>
  );
}
