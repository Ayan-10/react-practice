# m01 — BudgetBuddy · Cart with useReducer

**Time box:** ~20 min

You're given a complete **BudgetBuddy** mini-app: a navbar, a Shop page
(catalogue + cart), and a Saved route — all working. The ONE thing to build is
the cart's state logic, and it must be driven by **`useReducer`** (not a pile of
`useState`s).

> 👉 The file to edit is **`components/Cart.jsx`**. The JSX is already wired to a
> `dispatch`; you only need to implement the `cartReducer`.

## Requirements

Implement `cartReducer(state, action)` with state shape `{ items: [{ id, name, price, qty }] }`:

- `{ type: "add", product }` — add the product with `qty: 1`, or if it's already
  in the cart, bump its `qty` by 1.
- `{ type: "inc", id }` — increment that line's `qty`.
- `{ type: "dec", id }` — decrement that line's `qty`; when it reaches **0**,
  remove the line entirely.
- `{ type: "clear" }` — empty the cart.
- Any unknown action returns the state unchanged.

The component already renders these `data-testid`s from state:
`add-<id>`, `line-<id>`, `qty-<id>`, `inc-<id>`, `dec-<id>`, `clear-cart`,
`cart-count`, `cart-total`, and `cart-empty` (shown only when empty).

## Gotchas

- Never mutate `state` or `state.items` — return new arrays/objects.
- `dec` to 0 must **remove** the line (so `line-<id>` disappears), not leave a 0.
- Export both `cartReducer` and `initialState` (the test imports them directly).

## Run

```
npx vitest run src/modules/m01-reducer-cart/
```
