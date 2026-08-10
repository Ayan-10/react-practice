// SOLUTION — m03. Depend on primitives (or memoize the object).
import { useState, useEffect } from "react";

export default function EffectInfiniteLoop() {
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [summary, setSummary] = useState("");
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setSummary(`Showing ${category} over $${minPrice}`);
    setRenderCount((c) => c + 1);
  }, [category, minPrice]); // primitive deps — stable across renders

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
