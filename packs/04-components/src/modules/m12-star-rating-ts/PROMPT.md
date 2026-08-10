# m12 — [TS] Star rating (typed)

**Time box:** ~12 min

A typed star-rating component. `count` stars (default 5); hovering previews,
clicking selects, and it reports changes via `onChange`.

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
