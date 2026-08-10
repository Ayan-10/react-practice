// SOLUTION — m05 Infinite scroll / load more.
import { useEffect, useState } from "react";
import { fetchProducts } from "../../shared/api.js";

const PAGE_SIZE = 2;

export default function InfiniteList({ load = fetchProducts }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  async function loadBatch(skip) {
    const data = await load({ limit: PAGE_SIZE, skip });
    setItems((prev) => [...prev, ...data.products]);
    setTotal(data.total);
  }

  useEffect(() => {
    loadBatch(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  const hasMore = total === 0 ? false : items.length < total;

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
        <button data-testid="load-more" onClick={() => loadBatch(items.length)}>
          Load more
        </button>
      ) : (
        <p data-testid="end">No more</p>
      )}
    </div>
  );
}
