# m01 — Fetch states (loading / error / empty / data)

**Time box:** ~15 min

A `ProductList` should fetch products on mount and render the four canonical
async states correctly. Right now it renders nothing useful.

## Requirements

Use the injected `load` prop (defaults to `fetchProducts` from the shared API).
On mount:

1. Show a loading indicator while the request is in flight
   → `data-testid="loading"` with text `Loading...`
2. If the promise **rejects**, show an error state
   → `data-testid="error"` with text `Something went wrong`
3. If it resolves with an **empty** array, show an empty state
   → `data-testid="empty"` with text `No products`
4. If it resolves with products, render each one
   → container `data-testid="product-list"`, each card `data-testid="product-item"`

Only ONE of loading / error / empty / list is visible at a time.

## Gotchas

- Don't leave the app in "loading" forever — flip the flag in both success and
  failure paths (a `finally` is the clean way).
- Distinguish empty (resolved, length 0) from data (resolved, length > 0).
