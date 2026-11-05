// TODO: implement fetch states (loading / error / empty / data) — see PROMPT.md
import { loadSneakers } from "../data/sneakers.js";
import { useEffect, useState } from "react";
/**
 * THE FEATURE TO BUILD — m01 SneakerShop fetch states.
 *
 * `load` returns a promise resolving to { products, total }. It is injected as a
 * prop so tests can supply deterministic mocks; it defaults to the local
 * offline loader.
 *
 * TODO: track loading + error state.
 * TODO: call load() on mount; on success store products, on failure set error;
 *       always stop loading when done. Use an `active` cleanup flag.
 * TODO: render exactly ONE of loading / error / empty / product-list.
 */
export default function ProductList({ load = loadSneakers }) {
  // TODO: implement the fetch-states behavior described in PROMPT.md.
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    load()
      .then((data)=>{
        if(active) setProducts(data.products)
      }).catch(()=>{
        if(active) setError(true)
      }).finally(()=>{
        if(active) setLoading(false)
      })
    return () => {
      active = false;
    };
  }, [load]);

  return (
    <div className="ss-listing">
      <h2 className="ss-feature-title">Sneakers</h2>
      {loading && <p data-testid="loading">Loading...</p>}
      {error && <p data-testid="error">Something went wrong</p>}
      {!loading && !error && products.length === 0 && (
        <p data-testid="empty">No products</p>
      )}
      {!loading && !error && products.length > 0 && (
        <div data-testid="product-list" className="ss-grid">
          {products.map((p) => (
            <div key={p.id} className="ss-card" data-testid="product-item">
              <h3>{p.title}</h3>
              <p>${p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
