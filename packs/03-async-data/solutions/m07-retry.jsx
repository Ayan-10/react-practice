// SOLUTION — m07 CryptoTicker retry-on-error fetch.
// Copy this over components/RetryList.jsx to self-check.
import { useEffect, useState } from "react";
import { loadCoins } from "../data/coins.js";

export default function RetryList({ load = loadCoins }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const { products: list } = await load();
      setProducts(list);
    } catch {
      setError("Failed to load coins");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
