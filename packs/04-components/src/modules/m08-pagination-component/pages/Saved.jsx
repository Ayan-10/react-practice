import { Link } from "react-router-dom";
import { SAVED_RESULTS } from "../data/results.js";

// A second real route so navigation works — a list of saved results.
export default function Saved() {
  return (
    <section className="sr-page" data-testid="saved-page">
      <Link to="/" className="sr-back" data-testid="back-home">
        ← Back to results
      </Link>
      <h1 className="sr-page-title">Saved results</h1>
      <p className="sr-page-sub">{SAVED_RESULTS.length} bookmarks</p>
      <ul className="sr-list">
        {SAVED_RESULTS.map((r) => (
          <li key={r.id} className="sr-list-item">
            <span className="sr-list-title">{r.title}</span>
            <span className="sr-list-site">{r.site}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
