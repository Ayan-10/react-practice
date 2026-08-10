# m04 — Pagination (prev / next)

**Time box:** ~15 min

Build a paged product list. Each page has `PAGE_SIZE = 2` items. Fetch the
current page via `load({ limit, skip })` which resolves `{ products, total }`.

## Requirements

- Render current page items as `data-testid="product-item"`.
- `data-testid="next"` and `data-testid="prev"` buttons change pages.
- `data-testid="page-info"` shows `Page X of Y` (Y = ceil(total / PAGE_SIZE)).
- `prev` is **disabled** on page 1; `next` is **disabled** on the last page.
- Changing page refetches with the correct `skip = (page - 1) * PAGE_SIZE`.

## Gotchas

- Compute total pages from `total` returned by the API, not the current slice.
- Keep `page` 1-indexed but send a 0-indexed `skip`.
