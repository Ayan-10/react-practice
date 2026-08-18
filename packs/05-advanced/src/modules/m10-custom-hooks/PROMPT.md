# m10 — HookBox · Custom hooks library

**Time box:** ~25 min

You're given a complete **HookBox** mini-app: a navbar, a Home page with an
interactive **Demo**, and a second About route — all working. The Demo is done;
the ONE thing to build is the little hooks library it consumes.

> 👉 The file to edit is **`components/hooks.js`**. `components/Demo.jsx` and the
> tests both import these hooks; implement them for real.

## Requirements

Implement and export four hooks:

- **`useToggle(initial = false)` → `[value, toggle, setValue]`**
  - `toggle()` flips the boolean.
  - `toggle(true)` / `toggle(false)` set it explicitly when a boolean is passed.
  - `setValue` is the raw setter.
- **`usePrevious(value)` → the previous render's value** (`undefined` on the
  first render). Use `useRef` + `useEffect` (store the value *after* render).
- **`useDebounce(value, delay)` → a debounced copy** that only updates `delay`
  ms after `value` stops changing. Use `useState` + `useEffect` + `setTimeout`
  with cleanup.
- **`useLocalStorage(key, initial)` → `[value, setValue]`** persisted to
  `window.localStorage`: lazy-init from storage, JSON-serialise on write.

## Gotchas

- `usePrevious`: update the ref in an effect so the value you return lags one
  render behind.
- `useDebounce`: clear the previous timeout in the effect cleanup, or you'll
  leak stale updates.
- `useLocalStorage`: read once via a lazy initialiser (`useState(() => …)`),
  and `JSON.stringify` / `JSON.parse` around storage.
- `useToggle`: distinguish "called with a boolean" from "called with an event"
  (e.g. `typeof next === "boolean" ? next : !prev`).

## Run

```
npx vitest run src/modules/m10-custom-hooks/
```
