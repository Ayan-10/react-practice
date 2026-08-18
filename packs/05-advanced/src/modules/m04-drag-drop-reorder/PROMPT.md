# m04 — TaskFlow · Drag & drop reorder (HTML5 DnD, no libraries)

**Time box:** ~30 min

You're given a complete **TaskFlow** mini-app: a navbar, a Board page (a list of
tasks) and an Archive route — all working. The ONE thing to build is drag-and-
drop **reordering** of the task list, using the native HTML5 DnD API (no
libraries).

> 👉 The file to edit is **`components/ReorderList.jsx`**. The list, `draggable`
> items, event wiring and `order` readout are already there — you implement the
> pure `reorder` helper (and confirm the handlers use it).

## Requirements

1. Implement the PURE helper **`reorder(list, fromId, toId)`** → returns a NEW
   array with the item whose id is `fromId` moved to the index currently held by
   `toId`. Works moving both **down** and **up**; `fromId === toId` is a no-op;
   never mutate the input.
2. The handlers (already wired) must use it:
   - `onDragStart` remembers the dragged id.
   - `onDragOver` calls `e.preventDefault()` (so a drop is allowed).
   - `onDrop` sets state to `reorder(items, draggedId, targetId)`.
   - `onDragEnd` clears the dragged id.

The component renders these `data-testid`s:
`reorder-list`, `item-<id>` (in DOM order), and `order` (ids joined by `,`).

## Gotchas

- **You must `preventDefault()` in `onDragOver`** or the browser will never fire
  a `drop`.
- `reorder` must be immutable — splice a COPY, not the original.
- jsdom's native DnD is limited, so the tests unit-test `reorder` directly and
  also fire `dragStart`/`dragOver`/`drop` events; keep the dragged id in a ref
  so it survives across those events.
- Export `reorder` (the test imports it directly).

## Run

```
npx vitest run src/modules/m04-drag-drop-reorder/
```
