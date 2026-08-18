# Pack 04 — Components

Build the classic "build-from-partial" UI components interviews love — tabs, accordion, modal,
autocomplete, data table, stopwatch, stepper, pagination, nested comments — plus **3 TypeScript**
modules. Each is a complete mini-app; you implement one component.

## Setup (once)
```bash
npm install
```

## Practice a module
```bash
npm run dev            # dev server at http://localhost:5173 — a menu of all modules
npm test -- m01        # run ONE module's tests once
npm test               # run all once
npm run test:watch     # re-run on save while you work
npm run typecheck      # tsc --noEmit — check the TS modules (m10–m12)
```

**See the UI:** open http://localhost:5173, click a module to open its mini-app, use
`← All modules` to go back.

**Workflow:** read the module's `PROMPT.md` (it names the file to edit) → implement the component in
`components/<Feature>.jsx|.tsx` (the only file you touch; `App`, `pages`, `data`, `styles` already
work) → re-run tests until green → compare with `solutions/<module>.jsx|.tsx`.

## Modules
| # | Task | File to edit | Topic |
|---|------|--------------|-------|
| m01 | Tabs | `components/Tabs.jsx` | active tab state, panels |
| m02 | Accordion | `components/Accordion.jsx` | single/multi open |
| m03 | Modal / dialog | `components/Modal.jsx` | open/close, Esc, backdrop |
| m04 | Autocomplete | `components/Autocomplete.jsx` | async suggestions, keyboard nav |
| m05 | Data table | `components/DataTable.jsx` | column sort + search filter |
| m06 | Stopwatch | `components/Stopwatch.jsx` | `useRef` interval, start/stop/reset |
| m07 | Progress stepper | `components/Stepper.jsx` | step progress % |
| m08 | Pagination component | `components/Pagination.jsx` | reusable windowed pages |
| m09 | Nested comments (tree) | `components/Comments.jsx` | recursive render, collapse |
| m10 | Tabs **[TS]** | `components/Tabs.tsx` | typed props/state |
| m11 | useFetch hook **[TS]** | `components/UserList.tsx` | generic `useFetch<T>` |
| m12 | Star rating **[TS]** | `components/StarRating.tsx` | typed props |

Solutions in `solutions/` (`.jsx` / `.tsx`). Attempt first, then compare.

## Note
Tests mock any `fetch`/loaders and run offline & deterministically. The live app (`npm run dev`)
uses local fallback data. TS modules typecheck with `npm run typecheck`.
