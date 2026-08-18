import { Link } from "react-router-dom";
import StatusCard from "../components/StatusCard.jsx";
import { HISTORY } from "../data/status.js";

// A second real route so navigation works — a static incident log.
// Proves the app is a full mini-app, not a single screen.
export default function History() {
  return (
    <section className="sm-page" data-testid="history-page">
      <Link to="/" className="sm-back" data-testid="back-home">
        ← Back to live
      </Link>
      <h1 className="sm-page-title">Status history</h1>
      <p className="sm-page-sub">{HISTORY.length} recent changes</p>
      <div className="sm-history">
        {HISTORY.map((entry) => (
          <StatusCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
