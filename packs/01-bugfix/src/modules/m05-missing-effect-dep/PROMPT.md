# Bugfix: Missing useEffect dependency

**Time box:** ~10 min · **Difficulty:** warmup · **Topic:** dependency arrays, data refetch

## Bug
Typing in the search box never updates the results — the fetch effect only runs
once on mount because `query` is missing from its dependency array.

## Task
Make the results refetch whenever `query` changes. Empty query shows no results.

## Constraints
- Keep `data-testid`s: `query`, `results`, `result-item`.

## Run
```bash
npm test -- m05
```

## Hint
Add `query` to the dependency array: `}, [query]);`.
