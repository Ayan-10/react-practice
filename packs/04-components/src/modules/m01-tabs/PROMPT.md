# m01 — Tabs

**Time box:** ~12 min

Build a Tabs component. Given a `tabs` array of `{ id, label, content }`, render
a tab strip and show only the active tab's panel.

## Requirements

- Render one button per tab: `data-testid="tab-<id>"`.
- The active tab button has class `active`.
- Show only the active tab's content in `data-testid="panel"`.
- First tab is active by default. Clicking a tab activates it.

## Gotchas

- Only ONE panel is rendered at a time (the active one).
- Track the active tab id in state, not the index, so it's robust to reordering.
