import { useState } from "react";

export type StarRatingProps = {
  count?: number;
  value?: number;
  onChange?: (n: number) => void;
};

/**
 * THE FEATURE TO BUILD — m12 RateWidget typed star rating.
 *
 * Renders `count` star buttons (default 5). A star is "filled" when its index
 * is <= the currently previewed rating (`hovered ?? value`). Hovering star n
 * previews n filled; leaving clears the preview back to `value`. Clicking star
 * n calls `onChange(n)`.
 *
 * REQUIRED data-testids: star-<n> (per star, n = 1..count), rating-value.
 */
export default function StarRating({
  count = 5,
  value = 0,
  onChange,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const active = hovered ?? value;
  const stars = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div className="rw-rating">
      <div className="rw-stars">
        {stars.map((n) => (
          <button
            key={n}
            data-testid={`star-${n}`}
            className={n <= active ? "rw-star filled" : "rw-star"}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange?.(n)}
          >
            ★
          </button>
        ))}
      </div>
      <p className="rw-value" data-testid="rating-value">
        {value}
      </p>
    </div>
  );
}
