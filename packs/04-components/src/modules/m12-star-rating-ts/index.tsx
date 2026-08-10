import { useState } from "react";

type StarRatingProps = {
  count?: number;
  value?: number;
  onChange?: (n: number) => void;
};

/**
 * MODULE m12 — [TS] Star rating. Read PROMPT.md.
 */
export default function StarRating({
  count = 5,
  value = 0,
  onChange,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  // TODO: a star n is filled when n <= (hovered ?? value).
  // TODO: hover sets/clears preview; click calls onChange(n).

  const stars = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div>
      <h2>Rate (TS)</h2>
      <div className="stars">
        {stars.map((n) => (
          <button
            key={n}
            data-testid={`star-${n}`}
            className="star"
          >
            ★
          </button>
        ))}
      </div>
      <p data-testid="rating-value">{value}</p>
    </div>
  );
}
