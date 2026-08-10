# m08 — Pagination component (reusable)

**Time box:** ~15 min

Build a controlled `Pagination` component: given `totalPages`, `current`, and
`onChange`, render a windowed set of page buttons plus prev/next.

## Requirements

- Props: `totalPages`, `current` (1-indexed), `onChange(page)`.
- Render page number buttons `data-testid="page-<n>"`. To keep it compact, show
  at most a **window of 5** pages centered on `current` (clamped to valid range).
- The current page button has class `active`.
- `data-testid="prev"` calls `onChange(current-1)`, disabled when `current === 1`.
- `data-testid="next"` calls `onChange(current+1)`, disabled when `current === totalPages`.
- Clicking a page button calls `onChange(n)`.

## Gotchas

- Compute the window start so it never goes below 1 or past totalPages.
- This is CONTROLLED — don't hold page state internally; call `onChange`.
