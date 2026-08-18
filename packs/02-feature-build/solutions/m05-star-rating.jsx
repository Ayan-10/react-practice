// SOLUTION — m05 MovieRatings Star rating.
// Copy this over components/StarRating.jsx to self-check.
//
// (This component only needs `react`; it takes no props from the data layer,
//  so there are no relative imports to worry about from components/.)
import { useState } from "react";

export default function StarRating({ max = 5, onChange = () => {} }) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(0);

  return (
    <div className="mr-rating card" style={{ maxWidth: 320 }}>
      <h2 className="mr-rating-title">Your rating</h2>
      <div className="mr-stars" onMouseLeave={() => setHovered(0)}>
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
          const filled = n <= (hovered || selected);
          return (
            <span
              key={n}
              data-testid={`star-${n}`}
              className={filled ? "mr-star filled" : "mr-star"}
              style={{ cursor: "pointer", fontSize: 28, color: filled ? "#f5a623" : "#ccc" }}
              onClick={() => {
                setSelected(n);
                onChange(n);
              }}
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
