import { Link } from "react-router-dom";

// A second real route so navigation works. Documents the useFetch contract.
export default function Docs() {
  return (
    <section className="dl-page" data-testid="docs-page">
      <Link to="/" className="dl-back" data-testid="back-home">
        ← Back to users
      </Link>
      <h1 className="dl-page-title">Docs</h1>
      <p className="dl-page-sub">The useFetch hook contract</p>
      <ul className="dl-list">
        <li className="dl-list-item">
          <code>useFetch&lt;T&gt;(fn)</code> runs <code>fn()</code> on mount.
        </li>
        <li className="dl-list-item">
          Returns <code>{"{ data, loading, error }"}</code>.
        </li>
        <li className="dl-list-item">
          Ignores results that arrive after unmount.
        </li>
      </ul>
    </section>
  );
}
