// SOLUTION — m06 Optimistic update with rollback.
import { useState } from "react";

export default function LikeButton({ save, initialLiked = false, initialCount = 0 }) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  async function toggle() {
    const prevLiked = liked;
    const prevCount = count;
    const nextLiked = !liked;

    // Optimistic: update UI right away.
    setLiked(nextLiked);
    setCount((c) => c + (nextLiked ? 1 : -1));

    try {
      await save(nextLiked);
    } catch {
      // Roll back on failure.
      setLiked(prevLiked);
      setCount(prevCount);
    }
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
