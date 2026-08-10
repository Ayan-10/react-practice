# Pack 01 — Bug-Fix

Fix broken behavior in small, pre-built components — mirrors real OA "bugfix" tasks.

## Setup (once)
```bash
npm install
```

## Practice a module
```bash
npm run dev            # opens a menu of all modules in the browser
npm test -- m03        # run ONE module's tests (replace m03 with any module)
npm test               # run all modules
```

Each module folder in `src/modules/` has:
- `PROMPT.md` — the interview-style task + time box + hints
- `index.jsx` — the component to fix (starts broken/stubbed)
- `index.test.jsx` — tests that must pass

Reference solutions live in `solutions/`. **Attempt first**, then compare to learn the faster/cleaner approach.

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
