import { useState } from "react";

/**
 * MODULE m08 — Reusable pagination. Read PROMPT.md.
 *
 * Controlled component: props totalPages, current, onChange.
 */
export function Pagination({ totalPages, current, onChange }) {
  // TODO: compute a window of up to 5 page numbers centered on `current`.
  // TODO: render prev / page buttons (active class) / next with disabled edges.
  return (
    <div className="pagination">
      <button data-testid="prev">Prev</button>
      {/* TODO: page-<n> buttons */}
      <button data-testid="next">Next</button>
    </div>
  );
}

// Demo wrapper so the module renders in the app.
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
