import { Link } from "react-router-dom";
import { SEED_EVENTS } from "../data/feed.js";

// A second route. Navigating here unmounts the Home page (and its FeedTicker),
// which is the other way to exercise the subscription cleanup. Shows a static
// list of previously-seen events so the page has real content.
const ARCHIVED = [
  { id: "a1", kind: "like", text: "Ada liked your post", at: "2h ago" },
  { id: "a2", kind: "follow", text: "Grace started following you", at: "5h ago" },
  { id: "a3", kind: "comment", text: "Linus commented: nice work!", at: "yesterday" },
  ...SEED_EVENTS.map((e) => ({ ...e, at: "earlier" })),
];

export default function Archive() {
  return (
    <section className="lf-page" data-testid="archive-page">
      <Link to="/" className="lf-back">← Back to live</Link>
      <h1 className="lf-page-title">Archive</h1>
      <p className="lf-page-sub">{ARCHIVED.length} past notifications</p>
      <ul className="lf-ticker">
        {ARCHIVED.map((evt) => (
          <li key={evt.id} className="lf-item" data-testid="archive-item">
            <span className={`lf-badge lf-badge-${evt.kind}`}>{evt.kind}</span>
            <span className="lf-item-text">{evt.text}</span>
            <span className="lf-item-at">{evt.at}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
