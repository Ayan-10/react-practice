import { useState } from "react";
import { fallbackProducts } from "../../shared/api.js";

/**
 * FEATURE MODULE m08 — Client-side search filter.
 *
 * Filter the already-loaded products by the search text (case-insensitive,
 * matches title substring). Show a "no results" message when nothing matches.
 *
 * Required data-testids:
 *   - search-input
 *   - product-item (each matching row)
 *   - no-results (only when the filtered list is empty)
 */
const PRODUCTS = fallbackProducts;

export default function SearchFilter() {
  const [products] = useState(PRODUCTS);
  const [query, setQuery] = useState("");

  // TODO: derive `filtered` (case-insensitive title substring match)
  const filtered = products; // replace

  return (
    <div>
      <h2>Search products</h2>
      <input
        data-testid="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to filter"
      />
      <ul>
        {filtered.map((p) => (
          <li key={p.id} data-testid="product-item">{p.title}</li>
        ))}
      </ul>
      {/* TODO: render no-results when filtered is empty */}
    </div>
  );
}
