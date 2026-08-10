# Pack 03 — Async / Data

Practice the async data patterns that show up in almost every machine-coding
round: loading/error/empty states, debouncing, race conditions, pagination,
infinite scroll, optimistic updates, retry, dependent fetches, a reusable
`useFetch` hook, and polling.

## Setup

```bash
npm install
npm run dev     # open the app (renders fine; behaviour is what's broken/missing)
npm test        # run all module tests (they FAIL until you implement each module)
```

Run a single module's tests:

```bash
npx vitest run src/modules/m01-fetch-states
```

## Workflow

1. Pick a module folder under `src/modules/`.
2. Read its `PROMPT.md` (interview-style spec + hints).
3. Edit `index.jsx` to make `index.test.jsx` pass.
4. Stuck? Compare with `solutions/<module>.jsx` (peek only after a real attempt).

## Modules

| # | Module | Topic |
|---|--------|-------|
| m01 | Fetch states | loading / error / empty / data lifecycle |
| m02 | Debounced search | debounce + timer cleanup |
| m03 | Race condition | ignore stale responses |
| m04 | Pagination | prev/next, skip/limit, total pages |
| m05 | Infinite scroll | append batches, end marker |
| m06 | Optimistic update | instant UI + rollback on failure |
| m07 | Retry | error state with retry button |
| m08 | Dependent fetch | user → posts chained requests |
| m09 | useFetch hook | reusable data hook |
| m10 | Polling | interval fetch + cleanup |

All modules fetch via `src/shared/api.js`, which hits real free public APIs
(dummyjson, jsonplaceholder, frankfurter) with hardcoded offline fallbacks.
Tests inject mocked loaders for determinism.
