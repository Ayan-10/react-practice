import { Link } from "react-router-dom";
import { DOCS } from "../data/hints.js";

// A second real route so navigation works — documentation index.
export default function Docs() {
  return (
    <section className="hh-page" data-testid="docs-page">
      <Link to="/" className="hh-back" data-testid="back-home">
        ← Back home
      </Link>
      <h1 className="hh-page-title">Docs</h1>
      <p className="hh-page-sub">{DOCS.length} guides</p>
      <ul className="hh-doc-list">
        {DOCS.map((d) => (
          <li key={d.id} className="hh-doc-item">
            <span>{d.title}</span>
            <span>{d.mins} min read</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
