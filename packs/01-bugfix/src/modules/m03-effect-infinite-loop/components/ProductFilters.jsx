import { useState, useEffect, useRef, useMemo } from "react";
import { PRODUCTS, CATEGORIES, filterProducts } from "../data/products.js";

/**
 * 🐞 THIS IS THE FILE YOU NEED TO FIX.
 *
 * The filters panel lets the shopper narrow the catalog by category and a
 * minimum price. Whenever the filters change, an effect recomputes a short
 * "summary" line AND reports the filtered products back up to the page.
 *
 * BUG: the effect depends on a `filters` OBJECT that is re-created as a brand
 * new literal on EVERY render. React compares dependencies by reference, so the
 * object always looks "new" → the effect runs every render → it setStates →
 * that re-renders → the effect runs again … an infinite loop. You'll see
 * `render-count` climb without anyone touching the controls.
 *
 * Fix it so the effect only runs when the filter VALUES actually change
 * (`category` or `minPrice`), not on every render.
 *
 * DO NOT change or remove any existing data-testid attributes:
 *   category, min-price, summary, render-count
 */
export default function ProductFilters({ onFiltersChange }) {
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [summary, setSummary] = useState("");
  const [renderCount, setRenderCount] = useState(0);

  // Safety cap counter (survives re-renders). It exists ONLY to keep the buggy
  // infinite loop from HANGING the test runner under jsdom — see the effect
  // below. It is not part of the bug or the fix.
  const runs = useRef(0);
  const CAP = 25;

  // FIX: memoize the object so it only changes when the primitive filter
  // VALUES change, instead of being re-created on every render.
  const filters = useMemo(() => ({ category, minPrice }), [category, minPrice]);

  // TODO: Make this effect depend on the primitive filter VALUES instead of the
  //       `filters` object. Either:
  //         useEffect(() => { ... }, [category, minPrice]);
  //       or memoize the object:
  //         const filters = useMemo(() => ({ category, minPrice }), [category, minPrice]);
  useEffect(() => {
    // SAFETY CAP: once the runaway has clearly demonstrated the loop, hard-stop
    // ALL side effects (no more setState / onFiltersChange) so React has nothing
    // new to react to and bails out — instead of hanging. A correct fix makes
    // this effect run exactly ONCE, so `runs` never gets anywhere near the cap.
    if (runs.current >= CAP) return;
    runs.current += 1;

    const matches = filterProducts(PRODUCTS, filters.category, filters.minPrice);
    setSummary(
      `Showing ${matches.length} ${filters.category} item(s) over $${filters.minPrice}`
    );
    onFiltersChange(matches);
    setRenderCount((c) => (c < CAP ? c + 1 : c));
  }, [filters]);

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
