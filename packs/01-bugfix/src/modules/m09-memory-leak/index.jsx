import { useState, useEffect } from "react";
import { fetchProducts } from "../../shared/api.js";

/**
 * BUGFIX MODULE m09 — setState after unmount (memory leak).
 *
 * This component fetches data on mount. If it unmounts before the fetch resolves,
 * the `.then` still calls setState on an unmounted component. In tests we detect
 * this by spying on a "committed" callback that must NOT fire after unmount.
 *
 * Fix the effect to ignore the async result (and avoid setState) after unmount,
 * using a cleanup flag (or AbortController).
 *
 * `onCommit` is a test hook: call it ONLY when you actually apply the result to
 * state. It must not be called after the component has unmounted.
 */
export default function MemoryLeak({ onCommit }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // BUG: no cleanup — if unmounted before resolve, we still setState.
    fetchProducts({ limit: 4 }).then(({ products }) => {
      setProducts(products);
      setLoading(false);
      onCommit?.();
    });
  }, [onCommit]);

  if (loading) return <p data-testid="loading">Loading…</p>;
  return (
    <ul data-testid="products">
      {products.map((p) => (
        <li key={p.id} data-testid="product">{p.title}</li>
      ))}
    </ul>
  );
}
