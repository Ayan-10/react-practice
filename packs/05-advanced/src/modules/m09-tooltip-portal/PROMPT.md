# m09 — HelpHint · Tooltip via React portal

**Time box:** ~20 min

You're given a complete **HelpHint** mini-app: a navbar, a Home page with a
form label that should reveal a hint, and a second Docs route — all working. The
ONE thing to build is the tooltip itself.

> 👉 The file to edit is **`components/Tooltip.jsx`**. The trigger wrapper is
> already wired; you implement the show/hide + portal rendering.

## Requirements

`Tooltip({ label, children })` wraps a trigger and reveals a floating hint:

- The trigger wrapper has `data-testid="tooltip-trigger"`.
- Show on **`onMouseEnter`** and **`onFocus`**; hide on **`onMouseLeave`** and
  **`onBlur`**.
- While shown, render the tooltip through
  **`createPortal(..., document.body)`** — an element with
  `data-testid="tooltip"`, `role="tooltip"`, and the `label` as its text.
- Accessibility: give the tooltip an `id` and set **`aria-describedby`** on the
  trigger to that id while visible.
- Initially the tooltip must **NOT** be in the document.

## Gotchas

- Import `{ createPortal }` from **`"react-dom"`** (not `"react"`).
- Because it's portaled, the tooltip mounts under `document.body` — Testing
  Library's `screen` queries still find it, even though it's outside the
  trigger's DOM subtree.
- Use `useId()` for a stable id to link `aria-describedby`.
- `document.body` exists in jsdom; no need to create a container.

## Run

```
npx vitest run src/modules/m09-tooltip-portal/
```
