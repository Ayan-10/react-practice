# m03 — Race condition (stale response wins)

**Time box:** ~15 min

A details panel fetches when the selected `id` changes. If an **earlier, slower**
request resolves **after** a later one, the stale result overwrites the correct
one. Fix the race so only the response for the **current** id is applied.

## Requirements

- Buttons `data-testid="select-1"`, `select-2` change the selected id.
- On id change, call `load(id)` and render the result in `data-testid="detail"`.
- If a previous request is still in flight when the id changes, its result MUST
  be **ignored** when it eventually resolves.

## Gotchas

- Track whether the effect is still "current" (an `active`/`ignore` flag, or an
  incrementing request id, or `AbortController`). The classic fix: capture a
  local `let active = true` and set it false in the effect cleanup.
