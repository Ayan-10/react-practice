import { useEffect, useState } from "react";
import { loadSneakers } from "../data/sneakers.js";

/**
 * THE FEATURE TO BUILD — m01 SneakerShop fetch states.
 *
 * `load` returns a promise resolving to { products, total }. It is injected as a
 * prop so tests can supply deterministic mocks; it defaults to the local
 * offline loader so the mini-app renders real data.
 *
 * Render exactly ONE of: loading / error / empty / product-list.
 *
 * TODO: track loading + error state.
 * TODO: call load() on mount; on success store products, on failure set error;
 *       always stop loading when done. Use an `active` cleanup flag.
 * TODO: return the loading / error / empty branches BEFORE the list.
 */
export default function ProductList({ load = loadSneakers }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    load()
      .then(({ products: list }) => {
        if (!active) return;
        setProducts(list);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError("Something went wrong");
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [load]);

  if (loading) return <p data-testid="loading">Loading…</p>;
  if (error) return <p data-testid="error">{error}</p>;
  if (products.length === 0)
    return <p data-testid="empty">No products found.</p>;

  return (
    <div className="ss-listing">
      <h2 className="ss-feature-title">Sneakers</h2>
      <div data-testid="product-list" className="ss-grid">
        {products.map((p) => (
          <div key={p.id} className="ss-card" data-testid="product-item">
            <h3 className="ss-card-title">{p.title}</h3>
            <p className="ss-card-meta">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
