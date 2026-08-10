# Bugfix: Derived state stored in state (stale)

**Time box:** ~12 min · **Difficulty:** core · **Topic:** derive-during-render vs redundant state

## Bug
The filtered list is stored in its own `visible` state and only recomputed inside
the filter's onChange. So adding a new item doesn't show it (the derived state is
stale) until you retype in the filter.

## Task
Make the visible list always reflect the current `items` + `query`. Adding an item
that matches the current filter should show it immediately.

## Constraints
- Keep `data-testid`s: `filter`, `new-item`, `add`, `list`, `list-item`.

## Run
```bash
npm test -- m10
```

## Hint
Don't store derived data in state. Compute it during render:
`const visible = items.filter((it) => it.includes(query));` and delete the
`visible` state + its setters.
