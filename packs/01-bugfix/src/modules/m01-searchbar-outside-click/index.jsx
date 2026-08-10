import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { searchProducts } from "../../shared/api.js";

/**
 * BUGFIX MODULE m01 — Search bar doesn't close on outside click.
 *
 * Read PROMPT.md in this folder.
 *
 * Current behaviour: once the dropdown opens, it stays open even when the user
 * clicks outside the search area or navigates to a new page.
 *
 * Expected: the dropdown closes when clicking outside, but stays open while the
 * user is typing or interacting with the results. It should also close on route
 * change.
 *
 * DO NOT change or remove any existing data-testid attributes.
 * Your fix should live inside this component (event listeners + cleanup).
 */
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

  // TODO: Close the dropdown when the user clicks anywhere outside `searchRef`.
  //       Remember to clean up the listener.
  //
  // TODO: Also close the dropdown whenever the route (`location`) changes.

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
        <div
          data-testid="search-div"
          className="results-dropdown"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #e2e4e9",
            borderRadius: 8,
            marginTop: 4,
            padding: 8,
            zIndex: 10,
          }}
        >
          {results.length > 0 ? (
            results.map((r) => (
              <p key={r.id} data-testid="apartment-name-search-result" style={{ margin: "6px 0", cursor: "pointer" }}>
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
