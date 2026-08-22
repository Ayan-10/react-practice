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
  return (
    <div className="bl-postlist">
      <h2 className="bl-postlist-title">Posts</h2>
      <div data-testid="product-list" className="bl-grid"></div>

      <div className="bl-pager">
        <button data-testid="prev" className="bl-btn" disabled>
          Prev
        </button>
        <span data-testid="page-info" className="bl-page-info">
          Page 1 of 1
        </span>
        <button data-testid="next" className="bl-btn" disabled>
          Next
        </button>
      </div>
    </div>
  );
}
