import { useState } from "react";
import { saveLike } from "../data/posts.js";

/**
 * THE FEATURE TO BUILD — m06 SocialLikes optimistic update.
 *
 * `save(nextLiked)` returns a promise; it is injected as a prop so tests can
 * force success/failure, and defaults to the local offline saver.
 *
 * Behaviour:
 *   - Clicking the button flips liked and adjusts the count IMMEDIATELY
 *     (optimistic), before the request resolves.
 *   - If save() rejects, roll BOTH liked and count back to their previous
 *     values.
 *
 * REQUIRED data-testids: like-btn, like-count.
 */
export default function LikeButton({
  save = saveLike,
  initialLiked = false,
  initialCount = 0,
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  async function toggle() {
    const prevLiked = liked;
    const prevCount = count;
    const nextLiked = !prevLiked;

    // Optimistically update the UI right away.
    setLiked(nextLiked);
    setCount(nextLiked ? prevCount + 1 : prevCount - 1);

    try {
      await save(nextLiked);
    } catch {
      // Roll back on failure.
      setLiked(prevLiked);
      setCount(prevCount);
    }
  }

  return (
    <button
      className={liked ? "sl-like-btn liked" : "sl-like-btn"}
      data-testid="like-btn"
      onClick={toggle}
    >
      {liked ? "♥ Liked" : "♡ Like"}
      <span className="sl-like-count" data-testid="like-count">
        {count}
      </span>
    </button>
  );
}
