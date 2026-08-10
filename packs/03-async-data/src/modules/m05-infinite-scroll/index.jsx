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
  const [total, setTotal] = useState(0);

  // TODO: load the first batch on mount.
  // TODO: implement loadMore() that fetches the next batch (skip = items.length)
  //       and APPENDS to items.

  const hasMore = items.length < total || total === 0;

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

      {/* TODO: show load-more while more remain, else show `end` */}
      <button data-testid="load-more">Load more</button>
    </div>
  );
}
