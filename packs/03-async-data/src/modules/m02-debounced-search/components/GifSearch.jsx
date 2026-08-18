import { useEffect, useState } from "react";
import { searchGifs } from "../data/gifs.js";

/**
 * FEATURE — GifSearch (debounced search).
 *
 * Debounce `query` by 300ms before calling `search(query)`, then render the
 * results. `search` is injected as a prop (defaults to the local `searchGifs`
 * helper) so tests can pass a mock alongside fake timers.
 *
 * STUB: this renders the input + results container but does NOT debounce or
 * call `search`. Implement it so the feature tests pass.
 */
export default function GifSearch({ search = searchGifs }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      return;
    }

    let active = true;
    const id = setTimeout(() => {
      search(q).then((list) => {
        if (active) setResults(list);
      });
    }, 300);

    return () => {
      active = false;
      clearTimeout(id);
    };
  }, [query, search]);

  return (
    <div className="gs-search">
      <h2 className="gs-search-title">Search GIFs</h2>
      <input
        className="gs-search-input"
        data-testid="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search GIFs..."
      />
      <div data-testid="results" className="gs-results">
        {results.map((g) => (
          <div key={g.id} className="gs-result-item" data-testid="result-item">
            {g.title}
          </div>
        ))}
      </div>
    </div>
  );
}
