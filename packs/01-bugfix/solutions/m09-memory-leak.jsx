// SOLUTION — m09 LiveFeed. The fix for components/FeedTicker.jsx: capture the
// unsubscribe returned by subscribe(...) and RETURN a cleanup function from the
// effect that calls it, so the interval stops and subscriberCount() drops back
// to 0 when the component unmounts.
// Copy this file over components/FeedTicker.jsx to self-check.
import { useState, useEffect } from "react";
import { subscribe, SEED_EVENTS } from "../data/feed.js";

export default function FeedTicker() {
  const [events, setEvents] = useState(SEED_EVENTS);

  useEffect(() => {
    // ✅ FIX: keep the unsubscribe handle and return it as cleanup.
    const unsubscribe = subscribe((evt) => {
      setEvents((prev) => [evt, ...prev].slice(0, 8));
    }, 1000);

    return () => unsubscribe();
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
