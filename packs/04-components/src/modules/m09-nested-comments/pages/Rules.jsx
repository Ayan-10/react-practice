import { Link } from "react-router-dom";
import { RULES } from "../data/thread.js";

// A second real route so navigation works — the community rules.
export default function Rules() {
  return (
    <section className="ft-page" data-testid="rules-page">
      <Link to="/" className="ft-back" data-testid="back-home">
        ← Back to thread
      </Link>
      <h1 className="ft-page-title">Community rules</h1>
      <p className="ft-page-sub">{RULES.length} guidelines</p>
      <ol className="ft-rules">
        {RULES.map((r) => (
          <li key={r.id} className="ft-rule">
            {r.text}
          </li>
        ))}
      </ol>
    </section>
  );
}
