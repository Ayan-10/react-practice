import { useState } from "react";

/**
 * FEATURE MODULE m05 — Star rating (👈 THIS is the file you build).
 *
 * Read PROMPT.md. Right now this component only renders 5 grey stars and a
 * rating value that never changes. You must IMPLEMENT the interactive widget.
 *
 * Behaviour to build:
 *   - clicking a star sets the rating to that value and calls onChange(value)
 *   - hovering a star previews the fill up to that star (fill on hover)
 *   - leaving the star row returns the preview to the actual selected value
 *
 * A star is "filled" when its index n <= (hovered || selected). Mark filled
 * stars with a class containing "filled" (tests check className).
 *
 * REQUIRED data-testids:
 *   - star-<n> for n in 1..5  (the clickable star)
 *   - rating-value            (shows the current selected rating number)
 */
export default function StarRating({ max = 5, onChange = () => {} }) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(0);

  const active = hovered || selected;

  function handleClick(n) {
    setSelected(n);
    onChange(n);
  }

  return (
    <div className="mr-rating card" style={{ maxWidth: 320 }}>
      <h2 className="mr-rating-title">Your rating</h2>
      <div className="mr-stars" onMouseLeave={() => setHovered(0)}>
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
          const filled = n <= active;
          return (
            <span
              key={n}
              data-testid={`star-${n}`}
              className={filled ? "mr-star filled" : "mr-star"}
              style={{ cursor: "pointer", fontSize: 28, color: filled ? "#f5a623" : "#ccc" }}
              onClick={() => handleClick(n)}
              onMouseEnter={() => setHovered(n)}
            >
              ★
            </span>
          );
        })}
      </div>
      <p className="mr-rating-line">
        Rating: <span data-testid="rating-value">{selected}</span>
      </p>
    </div>
  );
}
