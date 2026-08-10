// SOLUTION — m05. Add `query` to the dependency array.
import { useState, useEffect } from "react";
import { searchProducts } from "../../shared/api.js";

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
  }, [query]); // <-- fixed

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
