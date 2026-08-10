# m07 — Retry on failure

**Time box:** ~12 min

When a fetch fails, show an error with a **Retry** button that re-runs the same
request. A retry that succeeds must clear the error and show the data.

## Requirements

- On mount, call `load()`.
- While in flight: `data-testid="loading"`.
- On failure: `data-testid="error"` (text `Failed`) plus `data-testid="retry"` button.
- Clicking retry re-calls `load()` and goes back through loading → data/error.
- On success: render items as `data-testid="product-item"` inside `data-testid="product-list"`.

## Gotchas

- Reuse one `fetchData` function for both the mount effect and the retry click.
- Reset the error before each attempt so a successful retry clears the old error.
