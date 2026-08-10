// SOLUTION — m09. Guard against setState after unmount with a cleanup flag.
import { useState, useEffect } from "react";
import { fetchProducts } from "../../shared/api.js";

export default function MemoryLeak({ onCommit }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchProducts({ limit: 4 }).then(({ products }) => {
      if (!active) return; // unmounted — ignore
      setProducts(products);
      setLoading(false);
      onCommit?.();
    });
    return () => {
      active = false;
    };
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
