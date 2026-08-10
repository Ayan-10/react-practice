import { useState, useEffect } from "react";

/**
 * BUGFIX MODULE m03 — useEffect infinite loop.
 *
 * This component fetches a "summary" whenever `filters` change. But `filters` is
 * a new object literal on every render, so the effect runs every render, calls
 * setState, re-renders, and loops forever (you'll see the render count explode).
 *
 * Fix it so the effect only runs when the filter VALUES actually change.
 * The visible "computed" text should reflect the current category + minPrice.
 */
export default function EffectInfiniteLoop() {
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [summary, setSummary] = useState("");
  const [renderCount, setRenderCount] = useState(0);

  // BUG: new object every render -> effect below sees a "new" dependency each time.
  const filters = { category, minPrice };

  useEffect(() => {
    // Simulate deriving a summary from filters.
    setSummary(`Showing ${filters.category} over $${filters.minPrice}`);
    // Safety cap: stop the runaway after it's clearly demonstrated the loop, so
    // the test runner doesn't hang. A correct fix makes this run exactly once.
    setRenderCount((c) => (c < 25 ? c + 1 : c));
  }, [filters]);

  return (
    <div className="card">
      <h2>Filter Summary</h2>
      <label>
        Category:{" "}
        <select data-testid="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">all</option>
          <option value="electronics">electronics</option>
          <option value="books">books</option>
        </select>
      </label>
      <p data-testid="summary">{summary}</p>
      <p data-testid="render-count">renders: {renderCount}</p>
    </div>
  );
}
