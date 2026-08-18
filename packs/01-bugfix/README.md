# Pack 01 — Bug-Fix

Fix broken behavior in small, pre-built components — mirrors real OA "bugfix" tasks.

## Setup (once)
```bash
npm install
```

## Practice a module
```bash
npm run dev            # dev server at http://localhost:5173 — a menu of all modules
npm test -- m03        # run ONE module's tests once (replace m03 with any module)
npm test               # run all modules once
npm run test:watch     # re-run on save while you work
```

**See the UI:** open http://localhost:5173, click a module to open its mini-app, use
`← All modules` to go back.

Each module folder in `src/modules/` is a full mini-app:
- `PROMPT.md` — the interview-style task + time box + hints (names the exact file to edit)
- `components/<Feature>.jsx` — 👈 **the ONE file you fix** (starts broken)
- `App.jsx` / `index.jsx` / `pages/` / `data/` / `styles.css` — already working; don't touch
- `index.test.jsx` — the tests that must pass

Reference solutions live in `solutions/<module>.jsx`. **Attempt first**, then open the solution to
compare. To self-check, copy the solution over the feature file, run the test, then restore your
version (see the root [`README.md`](../../README.md#4-view-the-solution-after-you-attempt)).

## Modules
| # | Task | Topic |
|---|------|-------|
| m01 | SearchBar closes on outside click | refs, event listeners, effect cleanup, router |
| m02 | Stale closure in setInterval | functional state updates |
| m03 | useEffect infinite loop | dependency arrays, referential equality |
| m04 | Direct state mutation | immutable updates |
| m05 | Missing effect dependency | dependency arrays / refetch |
| m06 | List key bug (index as key) | list keys / identity |
| m07 | Controlled/uncontrolled input | controlled inputs |
| m08 | Form reloads on submit | preventDefault |
| m09 | setState after unmount | effect cleanup / race |
| m10 | Derived state stored in state | derive during render |

## Note
Tests mock `fetch`/API so they run offline and deterministically. The app itself
(`npm run dev`) uses real free public APIs with a hardcoded fallback for offline use.
