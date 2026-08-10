# m09 — useFetch custom hook

**Time box:** ~15 min

Extract data-fetching into a reusable `useFetch(fn)` hook and consume it in a
component. This is a very common "show me you can abstract effects" ask.

## Requirements

Export a **named** hook `useFetch(fn)` that:
- runs `fn()` on mount (and again if `fn` changes),
- returns `{ data, loading, error }`,
- starts `loading: true`, `data: null`, `error: null`,
- on success sets `data` and `loading: false`,
- on failure sets `error` (the caught error) and `loading: false`,
- ignores a resolved/rejected result after unmount (no state update on dead component).

The **default export** `UserList` uses `useFetch(loadUsers)` and renders:
- `data-testid="loading"` while loading,
- `data-testid="error"` on error,
- `data-testid="user-item"` per user otherwise.

## Gotchas

- Guard against setting state after unmount (the classic `let active` flag).
- Re-run when `fn` identity changes (put it in the dependency array).
