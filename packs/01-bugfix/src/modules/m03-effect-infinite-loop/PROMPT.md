# ShopFilters — Filters panel loops forever

**Time box:** ~10 min · **Difficulty:** core · **Topic:** `useEffect` dependency arrays, referential equality, memoization

## The app
You've been handed **ShopFilters**, a small but complete product-catalog app:

```
m03-effect-infinite-loop/
├── App.jsx                     app root (layout + routes)
├── components/
│   ├── Navbar.jsx              top bar (brand + nav links)
│   ├── ProductFilters.jsx  👈  THE FILE YOU FIX
│   ├── ProductCard.jsx
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx               catalog grid + filters panel
│   └── ProductDetail.jsx      /product/:id
├── data/products.js           local dataset + filter helper (offline)
└── styles.css
```

Run the pack (`npm run dev`) and open **m03** to see it live: a navbar, a
filters panel (category + minimum price), and a grid of product cards.
Everything works — **except one bug**.

## The bug
The filters panel runs an effect that recomputes a short **summary** line and
reports the filtered products back up to the page. But it depends on a
`filters` object that is re-created as a brand new literal on **every render**.
React compares dependencies by reference, so the object always looks "new" →
the effect runs every render → it calls `setState` → that re-renders → the
effect runs again … an **infinite loop**. You'll see `render-count` climb
without anyone touching the controls.

> A safety cap in the component stops the runaway (so the test runner doesn't
> hang), but the loop is still the bug — a correct fix makes the effect run
> **once**.

## Your task
Fix **only** `components/ProductFilters.jsx` so that the effect runs **only when
the filter values actually change** (`category` or `minPrice`), not on every
render. The `summary` and the grid must still update correctly when a filter
changes.

## Constraints
- Edit **only** `components/ProductFilters.jsx`. The rest of the app is correct.
- **Do NOT remove or change any `data-testid`** — the tests depend on them:
  `category`, `min-price`, `summary`, `render-count`.

## How to run
```bash
npm test -- m03
```
Tests mount the **whole app** and drive it like a user. The bug tests FAIL
first; make them pass.

## Hints (peek only if stuck)
- Depend on the **primitive values** (`[category, minPrice]`) instead of the
  object, **or**
- Wrap `filters` in `useMemo(() => ({ category, minPrice }), [category, minPrice])`.
