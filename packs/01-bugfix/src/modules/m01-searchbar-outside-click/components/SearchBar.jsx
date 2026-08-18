import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchHouses } from "../data/houses.js";

/**
 * 🐞 THIS IS THE FILE YOU NEED TO FIX.
 *
 * The search bar lives in the navbar. When you type, a results dropdown opens.
 * BUG: once open, the dropdown stays open even when you click elsewhere on the
 * page, or navigate to another route. It should close on outside click and on
 * route change (but stay open while typing / interacting with the results).
 *
 * Everything else in this project already works — only edit this component.
 *
 * DO NOT change or remove any existing data-testid attributes:
 *   search-input, search-div, house-search-result
 */
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

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
