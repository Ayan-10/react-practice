// SOLUTION — m01 SearchBar outside-click. Attempt the module first!
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { searchProducts } from "../../shared/api.js";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();

  async function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      const data = await searchProducts(value);
      setResults(data);
      setOpen(true);
    } else {
      setResults([]);
      setOpen(false);
    }
  }

  // Close on outside click.
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="search-bar" ref={searchRef} style={{ position: "relative", maxWidth: 420 }}>
      <input
        data-testid="search-input"
        type="text"
        className="search-input"
        placeholder="Search for a location"
        value={query}
        onChange={handleChange}
        style={{ width: "100%" }}
      />
      {open && (
        <div data-testid="search-div" className="results-dropdown">
          {results.length > 0 ? (
            results.map((r) => (
              <p key={r.id} data-testid="apartment-name-search-result">
                {r.title}
              </p>
            ))
          ) : (
            <p className="no-results">No matching results found</p>
          )}
        </div>
      )}
    </div>
  );
}
