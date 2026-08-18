import { Link } from "react-router-dom";
import { SHORTCUTS } from "../data/commands.js";

// A second real route so navigation works — the keyboard shortcut cheat-sheet.
export default function Shortcuts() {
  return (
    <section className="km-page" data-testid="shortcuts-page">
      <Link to="/" className="km-back" data-testid="back-home">
        ← Back to palette
      </Link>
      <h1 className="km-page-title">Shortcuts</h1>
      <p className="km-page-sub">Keyboard controls for the menu.</p>
      <ul className="km-shortcut-list">
        {SHORTCUTS.map((s, i) => (
          <li key={i} className="km-shortcut-item">
            <kbd className="km-kbd">{s.keys}</kbd>
            <span className="km-shortcut-action">{s.action}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
