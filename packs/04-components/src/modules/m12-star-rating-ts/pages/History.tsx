import { Link } from "react-router-dom";
import { REVIEWS } from "../data/reviews.ts";

// A second real route so navigation works. Past ratings, most recent first.
export default function History() {
  return (
    <section className="rw-page" data-testid="history-page">
      <Link to="/" className="rw-back" data-testid="back-home">
        ← Back to rate
      </Link>
      <h1 className="rw-page-title">Rating history</h1>
      <p className="rw-page-sub">{REVIEWS.length} past ratings</p>
      <ul className="rw-list">
        {REVIEWS.map((r) => (
          <li key={r.id} className="rw-list-item">
            <span>{r.title}</span>
            <span className="rw-list-stars">{"★".repeat(r.stars)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
