import { useState } from "react";
import FeedTicker from "../components/FeedTicker.jsx";

export default function Home() {
  // A toggle so the FeedTicker can be UNmounted while the app stays alive —
  // this is what exercises the subscription cleanup (or exposes the leak).
  const [live, setLive] = useState(true);

  return (
    <section className="lf-page" data-testid="home-page">
      <h1 className="lf-page-title">Live activity</h1>
      <p className="lf-page-sub">Real-time notifications as they happen.</p>

      <button
        type="button"
        className="lf-toggle"
        data-testid="toggle-live"
        onClick={() => setLive((v) => !v)}
      >
        {live ? "Pause feed" : "Resume feed"}
      </button>

      {live && <FeedTicker />}
    </section>
  );
}
