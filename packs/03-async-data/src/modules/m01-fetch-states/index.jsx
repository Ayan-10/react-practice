import { useEffect, useState } from "react";
import { fetchProducts } from "../../shared/api.js";

/**
 * MODULE m01 — Fetch states. Read PROMPT.md.
 *
 * `load` returns a promise resolving to { products, total }.
 * Render exactly one of: loading / error / empty / product-list.
 */
export default function ProductList({ load = fetchProducts }) {
  const [products, setProducts] = useState([]);

  // TODO: track loading + error state.
  // TODO: call load() on mount; on success store products, on failure set error;
  //       always stop loading when done.

  useEffect(() => {
    // TODO: implement the fetch lifecycle here.
  }, [load]);

  // TODO: return loading / error / empty branches before the list.

  return (
    <div>
      <h2>Products</h2>
      <div data-testid="product-list" className="grid">
        {products.map((p) => (
          <div key={p.id} className="card" data-testid="product-item">
            <h3>{p.title}</h3>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
