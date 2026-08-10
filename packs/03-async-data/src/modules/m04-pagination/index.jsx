import { useEffect, useState } from "react";
import { fetchProducts } from "../../shared/api.js";

const PAGE_SIZE = 2;

/**
 * MODULE m04 — Pagination. Read PROMPT.md.
 *
 * `load({ limit, skip })` resolves { products, total }.
 */
export default function Pagination({ load = fetchProducts }) {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  // TODO: fetch the current page whenever `page` changes, using
  //       skip = (page - 1) * PAGE_SIZE and limit = PAGE_SIZE.
  //       Store products and total.

  // TODO: derive totalPages from total.

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

      <div style={{ marginTop: 12 }}>
        {/* TODO: prev/next buttons with correct disabled state + page-info */}
        <button data-testid="prev">Prev</button>
        <span data-testid="page-info">Page ? of ?</span>
        <button data-testid="next">Next</button>
      </div>
    </div>
  );
}
