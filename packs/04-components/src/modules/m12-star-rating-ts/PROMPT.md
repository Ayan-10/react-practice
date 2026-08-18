# m12 — RateWidget · [TS] Star rating (typed)

**Time box:** ~12 min

You're given a complete **RateWidget** mini-app: a navbar, a rating screen
(Home), and a History route — all working. The ONE thing to build is the typed
star-rating component.

> 👉 The file to edit is **`components/StarRating.tsx`**. Everything else already
> works. The dev menu / tests mount the whole app.

`count` stars (default 5); hovering previews, clicking selects, and it reports
changes via `onChange`.

## Folder

```
m12-star-rating-ts/
  App.tsx                    app root (navbar + routes)
  index.tsx                  entry (re-exports App)
  components/
    Navbar.tsx  Footer.tsx
    StarRating.tsx           👈 BUILD THIS
  pages/    Home.tsx  History.tsx
  data/reviews.ts            local past-ratings dataset
  styles.css
```

## Requirements

- Props: `{ count?: number; value?: number; onChange?: (n: number) => void }`.
- Render `count` star buttons: `data-testid="star-<n>"` (n = 1..count).
- A star is "filled" (class contains `filled`) when `n <= (hovered ?? value)`.
- Hovering star n previews n filled; leaving clears the preview (back to `value`).
- Clicking star n calls `onChange(n)`.
- Show the current selected value in `data-testid="rating-value"`.

## Gotchas

- Track `hovered` separately (number | null); preview overrides `value` only
  while hovering.
- Fully typed — no `any`.

## Run

```
npx vitest run src/modules/m12-star-rating-ts/
```
