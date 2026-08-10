import { useEffect, useState } from "react";
import { searchProducts } from "../../shared/api.js";

/**
 * MODULE m02 — Debounced search. Read PROMPT.md.
 *
 * Debounce the query by 300ms before calling `search`.
 */
export default function DebouncedSearch({ search = searchProducts }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // TODO: debounce `query` by 300ms; when the debounced value is non-empty,
  //       call search(debounced) and store the results. Clear the timer on
  //       every change so only the final keystroke fires.

  return (
    <div>
      <h2>Search</h2>
      <input
        data-testid="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      <div data-testid="results" className="grid" style={{ marginTop: 12 }}>
        {results.map((p) => (
          <div key={p.id} className="card" data-testid="result-item">
            {p.title}
          </div>
        ))}
      </div>
    </div>
  );
}
