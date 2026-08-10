// SOLUTION — m12 [TS] Star rating.
import { useState } from "react";

type StarRatingProps = {
  count?: number;
  value?: number;
  onChange?: (n: number) => void;
};

export default function StarRating({
  count = 5,
  value = 0,
  onChange,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = hovered ?? value;
  const stars = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div>
      <h2>Rate (TS)</h2>
      <div className="stars">
        {stars.map((n) => (
          <button
            key={n}
            data-testid={`star-${n}`}
            className={`star${n <= shown ? " filled" : ""}`}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange?.(n)}
          >
            ★
          </button>
        ))}
      </div>
      <p data-testid="rating-value">{value}</p>
    </div>
  );
}
