# Pack 03 — Async / Data

Practice the async data patterns that show up in almost every machine-coding
round: loading/error/empty states, debouncing, race conditions, pagination,
infinite scroll, optimistic updates, retry, dependent fetches, a reusable
`useFetch` hook, and polling.

## Setup

```bash
npm install
npm run dev     # dev server at http://localhost:5173 (renders fine; behaviour is what's missing)
npm test        # run all module tests once (they FAIL until you implement each module)
```

**See the UI:** open http://localhost:5173, click a module to open its mini-app, use
`← All modules` to go back.

Run a single module's tests:

```bash
npm test -- m01-fetch-states           # or: npx vitest run src/modules/m01-fetch-states
npm run test:watch                     # re-run on save while you work
```

## Workflow

1. Pick a module folder under `src/modules/` and open its mini-app in the browser.
2. Read its `PROMPT.md` (interview-style spec + hints; it names the file to edit).
3. Edit **`components/<Feature>.jsx`** — the ONE marked file — to make `index.test.jsx` pass.
   (`App.jsx`, `index.jsx`, `pages/`, `data/` already work; don't touch them.)
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
