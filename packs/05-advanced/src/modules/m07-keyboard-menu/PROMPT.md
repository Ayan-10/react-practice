# m07 — QuickCmd · Keyboard-navigable menu (roving focus)

**Time box:** ~25 min

You're given a complete **QuickCmd** mini-app: a navbar, a Home page with a
command palette, and a Shortcuts route — all working. The ONE thing to build is
the menu's **keyboard navigation**.

> 👉 The file to edit is **`components/Menu.jsx`**. The button, listbox and
> options are wired; you implement `nextIndex` and the key handlers.

## Requirements

A button (`menu-btn`) opens a listbox (`menu-list`, `role="listbox"`) with
options (`option-<i>`, `role="option"`) from `COMMANDS`. Track `activeIndex`.

Keyboard on the list:

- **ArrowDown** → next option, wrapping to `0` after the last.
- **ArrowUp** → previous option, wrapping to the last from `0`.
- **Home** → first option; **End** → last option.
- **Enter** → select the active option (`selected` shows its label) and close.
- **Escape** → close without selecting.

`nextIndex(key, current, length)` is a **pure** helper returning the new index
for arrow/Home/End keys (or `current` otherwise). The active option has
`aria-selected="true"` and the `km-active` class; the active index is exposed via
`data-testid="active-index"`.

Required `data-testid`s: `menu-btn`, `menu-list`, `option-<i>` (0-based),
`active-index`, `selected`.

## Gotchas

- Wrap-around both ways (down past last → 0; up past first → last).
- Enter must both set `selected` AND close the menu.
- `nextIndex` stays pure — no component state inside it.

## Run

```
npx vitest run src/modules/m07-keyboard-menu/
```
