# Bugfix: useEffect infinite loop

**Time box:** ~10 min · **Difficulty:** core · **Topic:** dependency arrays, referential equality, memoization

## Bug
The effect depends on a `filters` object that is re-created on every render, so it
runs on every render → sets state → re-renders → runs again. Infinite loop
(`render-count` keeps climbing without any user action).

## Task
Make the effect run **only when the filter values actually change**
(`category` or `minPrice`), not on every render. `summary` must still update
correctly when the category changes.

## Constraints
- Keep `data-testid`: `category`, `summary`, `render-count`.

## Run
```bash
npm test -- m03
```

## Hints
- Depend on the **primitive values** (`[category, minPrice]`) instead of the object, or
- Wrap `filters` in `useMemo(() => ({ category, minPrice }), [category, minPrice])`.
