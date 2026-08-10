# Bugfix: setState after unmount (memory leak)

**Time box:** ~12 min · **Difficulty:** core · **Topic:** effect cleanup, async race on unmount

## Bug
The component fetches on mount. If it unmounts before the request resolves, the
`.then` still updates state on an unmounted component (a leak / React warning in
older versions, and wasted work / potential race).

## Task
Ensure that after the component unmounts, the resolved fetch does **not** apply
its result. A test hook `onCommit` is passed in — call it only when you actually
set state with the result. It must never fire after unmount.

## Constraints
- Keep `data-testid`s: `loading`, `products`, `product`.
- Only apply the result if the component is still mounted.

## Run
```bash
npm test -- m09
```

## Hints
- Use a local flag: `let active = true;` set `active = false` in the cleanup
  function, and guard the `.then` with `if (!active) return;`.
- Or use an `AbortController` and abort in cleanup.
