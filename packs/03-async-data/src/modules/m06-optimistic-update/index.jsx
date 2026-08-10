import { useState } from "react";

/**
 * MODULE m06 — Optimistic update. Read PROMPT.md.
 *
 * `save(nextLiked)` returns a promise; on rejection, roll back.
 */
export default function LikeButton({ save, initialLiked = false, initialCount = 0 }) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  async function toggle() {
    // TODO: optimistically flip liked + count, then call save(nextLiked).
    // On failure, roll back to the previous liked + count.
  }

  return (
    <div>
      <h2>Post</h2>
      <button data-testid="like-btn" onClick={toggle}>
        {liked ? "Liked" : "Like"}
      </button>
      <span data-testid="like-count" style={{ marginLeft: 8 }}>{count}</span>
    </div>
  );
}
