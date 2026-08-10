# Feature: Sort Control

**Time box:** ~15 min · **Difficulty:** warmup · **Topic:** deriving a sorted list without mutation

## Task
Reorder the product list when the sort dropdown changes. Options:
`price-asc`, `price-desc`, `rating-desc`, `title-asc`.

## Required data-testids
`sort-select`, `product-item` (rows in sorted DOM order), `product-title`.

## Run
```bash
npm test -- m07
```

## Hints
- Copy first: `[...products].sort(...)` — never sort state in place.
- Titles: `a.title.localeCompare(b.title)`.
