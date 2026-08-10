# m02 — Debounced search

**Time box:** ~15 min

A search box calls an API on every keystroke — too many requests. Debounce it so
the search fires only **after the user stops typing for 300ms**.

## Requirements

- Input `data-testid="search-input"`.
- Debounce the query by **300ms**. Typing "abc" quickly should fire the search
  **once** (for "abc"), not three times.
- Use the injected `search` prop (defaults to `searchProducts`).
- Render results as `data-testid="result-item"` inside `data-testid="results"`.
- An empty/whitespace query should NOT call `search` and should show no results.

## Gotchas

- Clear the previous timer on every change (return a cleanup from the effect, or
  `clearTimeout` before setting a new one).
- Don't call `search` for an empty query.
