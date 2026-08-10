# Feature: Client-side Search Filter

**Time box:** ~10 min · **Difficulty:** warmup · **Topic:** derived filtering, empty state

## Task
Filter the loaded products by the search text — case-insensitive title substring.
Show `no-results` when nothing matches.

## Required data-testids
`search-input`, `product-item`, `no-results` (only when empty).

## Run
```bash
npm test -- m08
```

## Hint
`products.filter(p => p.title.toLowerCase().includes(query.toLowerCase().trim()))`.
