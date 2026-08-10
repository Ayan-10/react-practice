// SOLUTION — m05 Star rating.
import { useState } from "react";

export default function StarRating({ max = 5, onChange = () => {} }) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(0);

  return (
    <div className="card" style={{ maxWidth: 320 }}>
      <h2>Rate</h2>
      <div onMouseLeave={() => setHovered(0)}>
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
          const filled = n <= (hovered || selected);
          return (
            <span
              key={n}
              data-testid={`star-${n}`}
              className={filled ? "star filled" : "star"}
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
      <p>Rating: <span data-testid="rating-value">{selected}</span></p>
    </div>
  );
}
