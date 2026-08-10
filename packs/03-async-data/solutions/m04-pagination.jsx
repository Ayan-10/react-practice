// SOLUTION — m04 Pagination.
import { useEffect, useState } from "react";
import { fetchProducts } from "../../shared/api.js";

const PAGE_SIZE = 2;

export default function Pagination({ load = fetchProducts }) {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let active = true;
    load({ limit: PAGE_SIZE, skip: (page - 1) * PAGE_SIZE }).then((data) => {
      if (!active) return;
      setProducts(data.products);
      setTotal(data.total);
    });
    return () => {
      active = false;
    };
  }, [page, load]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

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
        <button
          data-testid="prev"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <span data-testid="page-info" style={{ margin: "0 12px" }}>
          Page {page} of {totalPages}
        </span>
        <button
          data-testid="next"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
