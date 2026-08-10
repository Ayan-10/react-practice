# m05 — Infinite scroll (load more)

**Time box:** ~15 min

Instead of pages, this list **appends** the next batch when "Load more" is
clicked (the same handler you'd wire to an IntersectionObserver sentinel in a
real app). Batch size `PAGE_SIZE = 2`.

## Requirements

- Load the first batch on mount; render items as `data-testid="product-item"`.
- `data-testid="load-more"` fetches the next batch and **appends** (does not
  replace) — so after N clicks you see (N+1) * PAGE_SIZE items.
- When all items are loaded (`items.length >= total`), hide `load-more` and show
  `data-testid="end"` with text `No more`.
- Use `load({ limit, skip })` → `{ products, total }`.

## Gotchas

- Append with `setItems(prev => [...prev, ...next])`, not replace.
- `skip` must advance by the number already loaded.
- Real-world: swap the button for an IntersectionObserver on a sentinel div — the
  fetch logic is identical.
