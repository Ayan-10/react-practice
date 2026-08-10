# Feature: Cart Management System

**Time box:** ~25 min · **Difficulty:** core · **Topic:** list state, quantity updates, derived totals

## Task
Wire up cart behavior on top of the product catalog.

## Requirements
- **Add**: clicking Add on a product adds it to the cart; if already present,
  increment its quantity instead of duplicating.
- **Inc / Dec**: change a line's quantity from the cart.
- Decreasing to **0** removes the line.
- **Totals**: `total-count` = sum of quantities; `total-price` = sum of
  `price * qty`, shown to 2 decimals. Both update in real time.

## Required data-testids
`add-<id>`, `cart-line-<id>`, `qty-<id>`, `inc-<id>`, `dec-<id>`,
`total-count`, `total-price`.

## Run
```bash
npm test -- m03
```

## Hints
- Keep the cart as an array of `{ ...product, qty }` and update immutably.
- Add: if `find(l => l.id === p.id)` → map+inc; else `[...cart, {...p, qty:1}]`.
