import { Link } from "react-router-dom";

const SHORTCUTS = [
  { keys: "Cmd+K", action: "Open palette" },
  { keys: "Cmd+P", action: "Go to file" },
  { keys: "Cmd+Shift+F", action: "Search project" },
];

export default function Shortcuts() {
  return (
    <section className="cp-page" data-testid="shortcuts-page">
      <Link to="/" className="cp-back" data-testid="back-home">
        ← Back to palette
      </Link>
      <h1 className="cp-page-title">Keyboard shortcuts</h1>
      <p className="cp-page-sub">{SHORTCUTS.length} handy bindings</p>
      <ul className="cp-shortcuts">
        {SHORTCUTS.map((s) => (
          <li key={s.keys}>
            <kbd>{s.keys}</kbd> — {s.action}
          </li>
        ))}
      </ul>
    </section>
  );
}
