// SOLUTION — m08 Search filter.
import { useState } from "react";
import { fallbackProducts } from "../../shared/api.js";

const PRODUCTS = fallbackProducts;

export default function SearchFilter() {
  const [products] = useState(PRODUCTS);
  const [query, setQuery] = useState("");

  const q = query.toLowerCase().trim();
  const filtered = products.filter((p) => p.title.toLowerCase().includes(q));

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
      {filtered.length === 0 && <p data-testid="no-results">No results</p>}
    </div>
  );
}
