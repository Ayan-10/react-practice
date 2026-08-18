import { useEffect, useState } from "react";
import { loadPosts } from "../data/posts.js";
import PostCard from "./PostCard.jsx";

const PAGE_SIZE = 2;

/**
 * FEATURE (STUB) — m04 BlogList pagination.
 *
 * `load({ limit, skip })` resolves { products, total }. Implement the paging
 * logic below so the feature tests pass. Copy over the completed component
 * from solutions/m04-pagination.jsx to self-check.
 */
export default function PostList({ load = loadPosts }) {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let active = true;
    const skip = (page - 1) * PAGE_SIZE;
    load({ limit: PAGE_SIZE, skip }).then(({ products: list, total: t }) => {
      if (!active) return;
      setProducts(list);
      setTotal(t);
    });
    return () => {
      active = false;
    };
  }, [page, load]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="bl-postlist">
      <h2 className="bl-postlist-title">Posts</h2>
      <div data-testid="product-list" className="bl-grid">
        {products.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>

      <div className="bl-pager">
        <button
          data-testid="prev"
          className="bl-btn"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <span data-testid="page-info" className="bl-page-info">
          Page {page} of {totalPages}
        </span>
        <button
          data-testid="next"
          className="bl-btn"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
