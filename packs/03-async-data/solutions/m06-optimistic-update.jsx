// SOLUTION — m06 SocialLikes optimistic update with rollback.
// Copy this over components/LikeButton.jsx to self-check.
import { useState } from "react";
import { saveLike } from "../data/posts.js";

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

    // Optimistic: update UI right away.
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
