import { useState, useEffect } from "react";
import { subscribe, SEED_EVENTS } from "../data/feed.js";

/**
 * 🐞 THIS IS THE FILE YOU NEED TO FIX.
 *
 * FeedTicker shows a live activity feed. On mount it opens a subscription
 * (an interval-driven pub/sub in data/feed.js) that pushes a new event every
 * second and prepends it to local state.
 *
 * 🐞 BUG (memory leak / setState-after-unmount): the effect starts the
 * subscription but NEVER cleans it up. When this component unmounts (toggle it
 * off, or navigate to the Archive route), the interval keeps firing and keeps
 * calling `setEvents` on an unmounted component — a classic leak. It also means
 * the active subscriber count in data/feed.js never returns to 0.
 *
 * Everything else in this project already works — only edit this component.
 *
 * DO NOT change or remove any existing data-testid attributes:
 *   feed-ticker, feed-item
 */
export default function FeedTicker() {
  const [events, setEvents] = useState(SEED_EVENTS);

  useEffect(() => {
    // 🐞 BUG: subscribe on mount but never unsubscribe — the effect returns
    // nothing, so the interval keeps firing after unmount (leak).
    subscribe((evt) => {
      setEvents((prev) => [evt, ...prev].slice(0, 8));
    }, 1000);

    // TODO (fix): return a cleanup from the effect that unsubscribes on unmount.
  }, []);

  return (
    <ul className="lf-ticker" data-testid="feed-ticker">
      {events.map((evt) => (
        <li key={evt.id} className="lf-item" data-testid="feed-item">
          <span className={`lf-badge lf-badge-${evt.kind}`}>{evt.kind}</span>
          <span className="lf-item-text">{evt.text}</span>
          <span className="lf-item-at">{evt.at}</span>
        </li>
      ))}
    </ul>
  );
}
