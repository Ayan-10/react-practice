# m07 — Progress stepper

**Time box:** ~12 min

Build a stepper that shows progress through N steps. Next/Back move between steps
and a progress bar reflects completion percentage.

## Requirements

- `steps` is an array of labels. Current step index starts at 0.
- `data-testid="current-label"` shows the current step's label.
- `data-testid="step-indicator"` shows `Step X of N` (1-indexed X).
- `data-testid="progress"` element has an inline style `width` = the percentage
  complete: `((index) / (N - 1)) * 100` as a string like `"50%"` (step 1 of 3 = 0%,
  last step = 100%).
- `data-testid="next"` advances (disabled on last step);
  `data-testid="back"` goes back (disabled on first step).

## Gotchas

- Clamp the index within `[0, N-1]`.
- Progress at the first step is 0%, at the last step is 100%.
