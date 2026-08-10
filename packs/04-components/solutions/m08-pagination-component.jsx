// SOLUTION — m08 Reusable pagination.
import { useState } from "react";

const WINDOW = 5;

export function Pagination({ totalPages, current, onChange }) {
  // Compute a 5-wide window centered on `current`, clamped to [1, totalPages].
  const half = Math.floor(WINDOW / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(totalPages, start + WINDOW - 1);
  start = Math.max(1, end - WINDOW + 1); // re-clamp when near the end

  const pages = [];
  for (let n = start; n <= end; n++) pages.push(n);

  return (
    <div className="pagination">
      <button
        data-testid="prev"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        Prev
      </button>
      {pages.map((n) => (
        <button
          key={n}
          data-testid={`page-${n}`}
          className={`page${n === current ? " active" : ""}`}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}
      <button
        data-testid="next"
        disabled={current === totalPages}
        onClick={() => onChange(current + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <div>
      <h2>Pagination</h2>
      <p>Page {page}</p>
      <Pagination totalPages={10} current={page} onChange={setPage} />
    </div>
  );
}
