# m02 — Accordion

**Time box:** ~12 min

Build an accordion from `items` (`{ id, title, body }`). Clicking a header
toggles its panel. Support a `multi` prop: when false (default) only ONE panel
is open at a time; when true, multiple can be open.

## Requirements

- Header buttons: `data-testid="header-<id>"`.
- A panel is visible only when open: `data-testid="panel-<id>"` (absent from the
  DOM when closed).
- Default (single mode): opening one closes the others.
- `multi` mode: each toggles independently.
- All start closed.

## Gotchas

- Single mode: store a single open id (or null). Multi mode: store a Set of ids.
- "Absent when closed" means conditionally render the panel, not just hide it.
