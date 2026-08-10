import { useState } from "react";

/**
 * FEATURE MODULE m05 — Star rating.
 *
 * Implement a 5-star rating:
 *   - clicking a star sets the rating to that value
 *   - hovering a star previews the rating up to that star (fill on hover)
 *   - leaving the stars returns the preview to the actual selected value
 *
 * Required data-testids:
 *   - star-<n> for n in 1..5  (the clickable star)
 *   - rating-value : shows the current selected rating number
 *
 * A star is "filled" when its index <= (hovered || selected). Mark filled stars
 * with a class containing "filled" (tests check className).
 */
export default function StarRating({ max = 5, onChange = () => {} }) {
  const [selected, setSelected] = useState(0);
  // TODO: track hovered value for preview

  return (
    <div className="card" style={{ maxWidth: 320 }}>
      <h2>Rate</h2>
      <div>
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
          const filled = false; // TODO: n <= (hovered || selected)
          return (
            <span
              key={n}
              data-testid={`star-${n}`}
              className={filled ? "star filled" : "star"}
              style={{ cursor: "pointer", fontSize: 28, color: filled ? "#f5a623" : "#ccc" }}
              // TODO: onClick / onMouseEnter / onMouseLeave
            >
              ★
            </span>
          );
        })}
      </div>
      <p>Rating: <span data-testid="rating-value">{selected}</span></p>
    </div>
  );
}
