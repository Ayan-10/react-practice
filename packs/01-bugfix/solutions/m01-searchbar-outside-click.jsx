// SOLUTION — m01 HouseFinder SearchBar close-behaviour.
// This is the FIXED version of components/SearchBar.jsx. Attempt it yourself
// first, then compare. To self-check: copy this over components/SearchBar.jsx.
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchHouses } from "../data/houses.js";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  async function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      const data = await searchHouses(value);
      setResults(data);
      setOpen(true);
    } else {
      setResults([]);
      setOpen(false);
    }
  }

  // FIX (1): close the dropdown when clicking outside the search area.
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // FIX (2): close the dropdown whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div
      className="search-bar"
      ref={searchRef}
      style={{ position: "relative", maxWidth: 420, flex: 1 }}
    >
      <input
        data-testid="search-input"
        type="text"
        className="search-input"
        placeholder="Search houses by name or city…"
        value={query}
        onChange={handleChange}
        style={{ width: "100%" }}
      />
      {open && (
        <div data-testid="search-div" className="results-dropdown">
          {results.length > 0 ? (
            results.map((r) => (
              <button
                key={r.id}
                type="button"
                data-testid="house-search-result"
                className="result-row"
                onClick={() => {
                  setQuery(r.title);
                  navigate(`/house/${r.id}`);
                }}
              >
                <span className="result-title">{r.title}</span>
                <span className="result-sub">{r.address}</span>
              </button>
            ))
          ) : (
            <p className="no-results">No matching houses found</p>
          )}
        </div>
      )}
    </div>
  );
}
