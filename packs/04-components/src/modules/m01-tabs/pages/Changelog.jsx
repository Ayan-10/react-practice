import { Link } from "react-router-dom";

const RELEASES = [
  { version: "2.1.0", note: "Added Settings tab." },
  { version: "2.0.0", note: "Rebuilt the docs viewer." },
  { version: "1.4.0", note: "Profile section polish." },
];

export default function Changelog() {
  return (
    <section className="dv-page" data-testid="changelog-page">
      <Link to="/" className="dv-back" data-testid="back-home">
        ← Back to docs
      </Link>
      <h1 className="dv-page-title">Changelog</h1>
      <p className="dv-page-sub">{RELEASES.length} recent releases</p>
      <ul className="dv-releases">
        {RELEASES.map((r) => (
          <li key={r.version}>
            <strong>{r.version}</strong> — {r.note}
          </li>
        ))}
      </ul>
    </section>
  );
}
