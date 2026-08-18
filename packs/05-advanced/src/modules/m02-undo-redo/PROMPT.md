# m02 — SketchPad · Undo / redo with useReducer

**Time box:** ~25 min

You're given a complete **SketchPad** mini-app: a navbar, an Editor page (a
single value with +/- controls and undo/redo), and a History route — all
working. The ONE thing to build is the undo/redo state logic, driven by
**`useReducer`** with the classic `{ past, present, future }` history stack.

> 👉 The file to edit is **`components/History.jsx`**. The JSX is already wired
> to a `dispatch`; you only need to implement `historyReducer`.

## Requirements

Implement `historyReducer(state, action)` with state shape
`{ past: [], present: <number>, future: [] }` (initial `present` = 0):

- `{ type: "set", value }` — push the current `present` onto `past`, set the new
  `present`, and **clear** `future`.
- `{ type: "undo" }` — pop the last item off `past` into `present`, pushing the
  old `present` onto the **front** of `future`. **No-op** if `past` is empty.
- `{ type: "redo" }` — shift the first item off `future` into `present`, pushing
  the old `present` onto the end of `past`. **No-op** if `future` is empty.
- `{ type: "reset" }` — back to `initialState`.
- Any unknown action returns the state unchanged.

The component already renders these `data-testid`s from state:
`value`, `inc-btn`, `dec-btn`, `undo-btn`, `redo-btn`, `reset-btn`.

## Gotchas

- Never mutate `state`, `state.past`, or `state.future` — return new arrays.
- `undo-btn` must be `disabled` when `past` is empty; `redo-btn` `disabled` when
  `future` is empty (the JSX already wires this to your state shape).
- After a `set`, redo history is gone (`future` cleared) — this is expected.
- Export both `historyReducer` and `initialState` (the test imports them directly).

## Run

```
npx vitest run src/modules/m02-undo-redo/
```
