// SOLUTION — m07 Retry on failure.
import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "../../shared/api.js";

export default function RetryList({ load = fetchProducts }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(false);
    return load()
      .then((data) => setProducts(data.products))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [load]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <p data-testid="loading">Loading...</p>;
  if (error) {
    return (
      <div>
        <p data-testid="error">Failed</p>
        <button data-testid="retry" onClick={fetchData}>Retry</button>
      </div>
    );
  }

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
