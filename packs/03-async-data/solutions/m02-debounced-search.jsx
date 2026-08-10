// SOLUTION — m02 Debounced search.
import { useEffect, useState } from "react";
import { searchProducts } from "../../shared/api.js";

export default function DebouncedSearch({ search = searchProducts }) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [results, setResults] = useState([]);

  // Debounce the raw query into `debounced` after 300ms of no typing.
  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(id);
  }, [query]);

  // Fire the search when the debounced value changes and is non-empty.
  useEffect(() => {
    const q = debounced.trim();
    if (!q) {
      setResults([]);
      return;
    }
    let active = true;
    search(q).then((r) => {
      if (active) setResults(r);
    });
    return () => {
      active = false;
    };
  }, [debounced, search]);

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
