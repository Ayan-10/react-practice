import { useEffect, useState } from "react";
import { fetchProducts } from "../../shared/api.js";

const PAGE_SIZE = 2;

/**
 * MODULE m05 — Infinite scroll / load more. Read PROMPT.md.
 *
 * `load({ limit, skip })` resolves { products, total }.
 */
export default function InfiniteList({ load = fetchProducts }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadMore(skip) {
    setLoading(true);
    try {
      const { products, total: t } = await load({ limit: PAGE_SIZE, skip });
      setItems((prev) => [...prev, ...products]);
      setTotal(t);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMore(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasMore = total === null || items.length < total;

  return (
    <div>
      <h2>Products</h2>
      <div data-testid="product-list" className="grid">
        {items.map((p) => (
          <div key={p.id} className="card" data-testid="product-item">
            {p.title}
          </div>
        ))}
      </div>

      {hasMore ? (
        <button
          data-testid="load-more"
          disabled={loading}
          onClick={() => loadMore(items.length)}
        >
          {loading ? "Loading…" : "Load more"}
        </button>
      ) : (
        <p data-testid="end">No more products</p>
      )}
    </div>
  );
}
