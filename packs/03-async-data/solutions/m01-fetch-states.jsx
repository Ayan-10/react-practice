// SOLUTION — m01 SneakerShop fetch states.
// Copy this over components/ProductList.jsx to self-check.
import { useEffect, useState } from "react";
import { loadSneakers } from "../data/sneakers.js";

export default function ProductList({ load = loadSneakers }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    load()
      .then((data) => {
        if (active) setProducts(data.products);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [load]);

  if (loading) return <p data-testid="loading">Loading...</p>;
  if (error) return <p data-testid="error">Something went wrong</p>;
  if (products.length === 0) return <p data-testid="empty">No products</p>;

  return (
    <div className="ss-listing">
      <h2 className="ss-feature-title">Sneakers</h2>
      <div data-testid="product-list" className="ss-grid">
        {products.map((p) => (
          <div key={p.id} className="ss-card" data-testid="product-item">
            <h3>{p.title}</h3>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
