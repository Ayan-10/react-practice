# m04 — Autocomplete / combobox

**Time box:** ~18 min

Build an autocomplete input that fetches suggestions as you type and lets you
pick one with the mouse or keyboard.

## Requirements

- Input `data-testid="ac-input"`.
- On input change, call `getSuggestions(query)` (returns `Promise<string[]>`).
  For an empty query, show no list and don't call it.
- Render suggestions as `data-testid="option-<index>"` inside
  `data-testid="ac-list"`.
- Arrow Down / Up move the highlighted option (wraps or clamps — your call);
  the highlighted option has class `highlight`.
- Enter selects the highlighted option: fills the input with it and closes the list.
- Clicking an option selects it the same way.

## Gotchas

- Reset the highlighted index when the suggestion list changes.
- Close the list (clear suggestions) after a selection.
- Don't fetch for an empty/whitespace query.
