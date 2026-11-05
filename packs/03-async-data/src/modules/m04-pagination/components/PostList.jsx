import { useEffect, useState } from "react";
import { loadPosts } from "../data/posts.js";
import PostCard from "./PostCard.jsx";

const PAGE_SIZE = 2;

// TODO: implement pagination — see PROMPT.md
//
// `load({ limit, skip })` resolves { products, total }. Implement:
//   - track the current page (1-based) in state
//   - fetch the current page on mount and whenever the page changes
//   - render page-info as "Page {page} of {totalPages}"
//   - Prev/Next buttons that change the page; disable Prev on page 1 and
//     Next on the last page
// Required data-testids: product-list, prev, page-info, next (already wired
// below — keep them).
export default function PostList({ load = loadPosts }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    load({limit: PAGE_SIZE, skip: (page - 1) * PAGE_SIZE})
    .then((data) => {
      setPosts(data.products);
      setTotalPages(Math.ceil(data.total / PAGE_SIZE));
    });
  }, [load, page]);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  return (
    <div className="bl-postlist">
      <h2 className="bl-postlist-title">Posts</h2>
      <div data-testid="product-list" className="bl-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="bl-pager">
        <button data-testid="prev" className="bl-btn" disabled={page === 1} onClick={handlePrev}>
          Prev
        </button>
        <span data-testid="page-info" className="bl-page-info">
          Page {page} of {totalPages}
        </span>
        <button data-testid="next" className="bl-btn" disabled={page === totalPages} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}
