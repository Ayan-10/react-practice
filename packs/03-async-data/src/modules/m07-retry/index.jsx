import { useEffect, useState } from "react";
import { fetchProducts } from "../../shared/api.js";

/**
 * MODULE m07 — Retry on failure. Read PROMPT.md.
 *
 * `load` resolves { products, total } or rejects.
 */
export default function RetryList({ load = fetchProducts }) {
  const [products, setProducts] = useState([]);

  // TODO: loading + error state.
  // TODO: a fetchData() used by both mount and the retry button.

  useEffect(() => {
    // TODO: call fetchData() on mount.
  }, []);

  // TODO: render loading / error (+retry) / list.

  return (
    <div>
      <h2>Products</h2>
      <div data-testid="product-list" className="grid">
        {products.map((p) => (
          <div key={p.id} className="card" data-testid="product-item">
            {p.title}
          </div>
        ))}
      </div>
    </div>
  );
}
