import { useState } from "react";
import { loadCoins } from "../data/coins.js";

/**
 * THE FEATURE TO BUILD — m07 CryptoTicker retry-on-error.
 *
 * `load` returns a promise resolving to { products, total } or rejects. It is
 * injected as a prop so tests can force success/failure, and defaults to the
 * local offline loader so the mini-app renders real data.
 *
 * Behaviour:
 *   - On mount, call load(). While in flight, show a loading state.
 *   - On failure, show an error plus a Retry button that re-runs load().
 *   - A retry that succeeds clears the error and renders the list.
 *
 * REQUIRED data-testids: loading, error, retry, product-list, product-item.
 */
export default function RetryList({ load = loadCoins }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: implement fetchData() — set loading true, clear error, await
  // load(), store the products on success or setError(...) on failure,
  // always clear loading. Call it once on mount, and again from the Retry
  // button's onClick below.
  async function fetchData() {}

  if (loading) return <p data-testid="loading">Loading…</p>;

  if (error) {
    return (
      <div className="ct-error-box">
        <p data-testid="error">{error}</p>
        <button className="ct-retry" data-testid="retry" onClick={fetchData}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="ct-listing">
      <h2 className="ct-feature-title">Coins</h2>
      <div data-testid="product-list" className="ct-grid">
        {products.map((c) => (
          <div key={c.id} className="ct-card" data-testid="product-item">
            <h3 className="ct-card-title">{c.title}</h3>
            <p className="ct-card-meta">
              {c.symbol} · ${c.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
