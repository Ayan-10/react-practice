import { useState, useEffect } from "react";
import { searchProducts } from "../../shared/api.js";

/**
 * BUGFIX MODULE m05 — Missing effect dependency.
 *
 * The list should refetch whenever `query` changes. Bug: the effect has an empty
 * dependency array, so it only runs once on mount and never reacts to typing.
 *
 * Fix the dependency array so results update as the query changes.
 */
export default function MissingEffectDep() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    let active = true;
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    searchProducts(query).then((data) => {
      if (active) setResults(data);
    });
    return () => {
      active = false;
    };
    // BUG: query is missing from the dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card">
      <h2>Product Search</h2>
      <input
        data-testid="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products"
      />
      <ul data-testid="results">
        {results.map((r) => (
          <li key={r.id} data-testid="result-item">{r.title}</li>
        ))}
      </ul>
    </div>
  );
}
