import { Link } from "react-router-dom";
import { HOOKS } from "../data/info.js";

// A second real route so navigation works — the library reference.
export default function About() {
  return (
    <section className="hb-page" data-testid="about-page">
      <Link to="/" className="hb-back" data-testid="back-home">
        ← Back to playground
      </Link>
      <h1 className="hb-page-title">About the hooks</h1>
      <p className="hb-page-sub">{HOOKS.length} hooks in the box</p>
      <ul className="hb-hook-list">
        {HOOKS.map((h) => (
          <li key={h.id} className="hb-hook-item">
            <code>{h.name}</code>
            <span>{h.blurb}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
