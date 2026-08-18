import { Link } from "react-router-dom";
import { APPLICATION_SCHEMA, JOB } from "../data/schema.js";

// A second real route so navigation works. It documents the fields the
// application form collects. Proves the app is a full mini-app, not one screen.
export default function Submissions() {
  return (
    <section className="ja-page" data-testid="submissions-page">
      <Link to="/" className="ja-back" data-testid="back-home">
        ← Back to apply
      </Link>
      <h1 className="ja-page-title">Submissions</h1>
      <p className="ja-page-sub">
        Fields collected for the {JOB.title} role
      </p>
      <ul className="ja-field-list">
        {APPLICATION_SCHEMA.map((f) => (
          <li key={f.name} className="ja-field-row">
            <strong>{f.label}</strong>
            <span className="ja-field-meta">
              {f.type}
              {f.required ? " · required" : " · optional"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
