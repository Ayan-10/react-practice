# Feature: Star Rating

**Time box:** ~15 min · **Difficulty:** warmup/core · **Topic:** hover preview + selected state

## Task
Build a 5-star rating. Click sets the rating; hover previews fill up to that star;
mouse leave restores the selected value. Call `onChange(value)` on click.

## Required data-testids
- `star-<n>` for n in 1..5
- `rating-value` shows the selected number

A star is "filled" when `n <= (hovered || selected)`; filled stars must have a
class containing `filled`.

## Run
```bash
npm test -- m05
```

## Hints
- Two states: `selected` and `hovered` (0 when not hovering).
- `filled = n <= (hovered || selected)`.
