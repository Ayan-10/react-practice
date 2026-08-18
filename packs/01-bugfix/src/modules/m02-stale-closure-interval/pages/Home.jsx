import TimerPanel from "../components/TimerPanel.jsx";
import { PRESETS, SESSIONS } from "../data/sessions.js";

// The most recent handful of sessions, shown under the timer as context.
const RECENT = SESSIONS.slice(-3).reverse();

export default function Home() {
  return (
    <section className="ft-page" data-testid="home-page">
      <h1 className="ft-page-title">Focus session</h1>
      <p className="ft-page-sub">Start the clock and stay on task.</p>

      <TimerPanel />

      <div className="ft-presets" data-testid="presets">
        {PRESETS.map((p) => (
          <span key={p.id} className="ft-chip" data-testid="preset-chip">
            {p.label} · {p.minutes}m
          </span>
        ))}
      </div>

      <div className="ft-recent">
        <h2 className="ft-section-title">Recent sessions</h2>
        <ul className="ft-session-list">
          {RECENT.map((s) => (
            <li key={s.id} className="ft-session-row" data-testid="session-row">
              <span className="ft-session-task">{s.task}</span>
              <span className="ft-session-min">{s.minutes}m</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
