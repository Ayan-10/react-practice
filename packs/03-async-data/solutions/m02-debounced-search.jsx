// SOLUTION — m02 GifSearch debounced search. Copy over components/GifSearch.jsx to self-check.
import { useEffect, useState } from "react";
import { searchGifs } from "../data/gifs.js";

export default function GifSearch({ search = searchGifs }) {
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
