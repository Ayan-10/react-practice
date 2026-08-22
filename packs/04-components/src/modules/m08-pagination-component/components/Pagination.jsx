import { useState } from "react";

/**
 * THE FEATURE TO BUILD — m08 SearchResults reusable pagination.
 *
 * Controlled component: props totalPages, current, onChange. It renders a
 * sliding WINDOW of up to 5 page buttons centered on `current`, clamped so it
 * never runs off either end. Prev/Next step by one and disable at the bounds.
 *
 * REQUIRED data-testids: prev, next, page-<n> (active page gets a class
 * containing "active").
 */
export function Pagination({ totalPages, current, onChange }) {
  // TODO: compute a sliding window of up to 5 page numbers centered on
  // `current`, clamped to [1, totalPages] so it never runs off either end.
  const pages = [current];

  return (
    <div className="sr-pagination">
      <button
        className="sr-page-btn"
        data-testid="prev"
        disabled={current <= 1}
        onClick={() => onChange(current - 1)}
      >
        Prev
      </button>
      {pages.map((n) => (
        <button
          key={n}
          data-testid={`page-${n}`}
          className={n === current ? "sr-page active" : "sr-page"}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}
      <button
        className="sr-page-btn"
        data-testid="next"
        disabled={current >= totalPages}
        onClick={() => onChange(current + 1)}
      >
        Next
      </button>
    </div>
  );
}

// Demo wrapper so the module renders in the app (Home uses this).
export default function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <div className="sr-demo">
      <p className="sr-demo-page" data-testid="demo-page">
        Page {page}
      </p>
      <Pagination totalPages={10} current={page} onChange={setPage} />
    </div>
  );
}
