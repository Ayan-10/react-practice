import { useEffect, useState } from "react";
import { searchGifs } from "../data/gifs.js";
import useDebounce from "../hooks/useDebounce.js";

/**
 * FEATURE — GifSearch (debounced search).
 *
 * Debounce `query` by 300ms before calling `search(query)`, then render the
 * results. `search` is injected as a prop (defaults to the local `searchGifs`
 * helper) so tests can pass a mock alongside fake timers.
 */
export default function GifSearch({ search = searchGifs }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();
    if (trimmedQuery === "") {
      setResults([]);
      return;
    }

    search(trimmedQuery).then((data) => {
      setResults(data);
    });
  }, [debouncedQuery, search]);

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
