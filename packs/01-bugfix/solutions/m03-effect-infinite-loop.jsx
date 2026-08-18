// SOLUTION — m03 ShopFilters ProductFilters effect infinite loop.
// This is the FIXED version of components/ProductFilters.jsx. Attempt it
// yourself first, then compare. To self-check: copy this over
// components/ProductFilters.jsx.
//
// Fix: depend on the primitive filter VALUES (category, minPrice) instead of a
// `filters` object that is re-created every render. (Alternatively, wrap the
// object in useMemo keyed on the same primitives.) Now the effect runs once on
// mount and again only when a value actually changes — no loop.
import { useState, useEffect } from "react";
import { PRODUCTS, CATEGORIES, filterProducts } from "../data/products.js";

export default function ProductFilters({ onFiltersChange }) {
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [summary, setSummary] = useState("");
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    const matches = filterProducts(PRODUCTS, category, minPrice);
    setSummary(
      `Showing ${matches.length} ${category} item(s) over $${minPrice}`
    );
    onFiltersChange(matches);
    setRenderCount((c) => c + 1);
  }, [category, minPrice]); // primitive deps — stable across renders

  return (
    <div className="pf-filters" data-testid="product-filters">
      <h2 className="pf-filters-title">Filters</h2>

      <label className="pf-field">
        Category:{" "}
        <select
          data-testid="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="pf-field">
        Min price: ${minPrice}
        <input
          data-testid="min-price"
          type="range"
          min="0"
          max="100"
          step="10"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
      </label>

      <p data-testid="summary" className="pf-summary">
        {summary}
      </p>
      <p data-testid="render-count" className="pf-render-count">
        renders: {renderCount}
      </p>
    </div>
  );
}
