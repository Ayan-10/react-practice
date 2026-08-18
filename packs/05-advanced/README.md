# Pack 05 — Advanced

The advanced patterns that separate a passing machine-coding round from a great one:
`useReducer`, undo/redo history, memoization (`useMemo`/`useCallback`/`React.memo`),
drag-and-drop reorder, finite state machines, multi-step forms with cross-field validation,
keyboard-navigable menus, carousels, portal tooltips, and a custom-hooks library. Each is a
complete mini-app; you implement one component (or hook).

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
```

**See the UI:** open http://localhost:5173, click a module to open its mini-app, use
`← All modules` to go back.

**Workflow:** read the module's `PROMPT.md` (it names the file to edit) → implement the component in
`components/<Feature>.jsx` (the only file you touch; `App`, `pages`, `data`, `styles` already
work) → re-run tests until green → compare with `solutions/<module>.jsx`.

## Modules
| # | Task | File to edit | Topic |
|---|------|--------------|-------|
| m01 | Cart with `useReducer` | `components/Cart.jsx` | reducer, immutable updates |
| m02 | Undo / redo history | `components/History.jsx` | past/present/future stacks |
| m03 | Memoization | `components/PrimeList.jsx` | `useMemo`/`useCallback`/`React.memo` |
| m04 | Drag & drop reorder | `components/ReorderList.jsx` | HTML5 DnD + pure `reorder()` |
| m05 | Traffic-light state machine | `components/TrafficLight.jsx` | finite states + pure `nextState()` |
| m06 | Multi-step form | `components/Wizard.jsx` | step state, cross-field + async submit |
| m07 | Keyboard menu | `components/Menu.jsx` | roving focus, arrow/Home/End/Enter/Esc |
| m08 | Carousel | `components/Carousel.jsx` | next/prev/dots, wrap-around |
| m09 | Tooltip (portal) | `components/Tooltip.jsx` | `createPortal`, hover+focus, aria |
| m10 | Custom hooks library | `components/hooks.js` | `useToggle`/`usePrevious`/`useDebounce`/`useLocalStorage` |

Solutions in `solutions/` (`.jsx`; m10 is `solutions/m10-custom-hooks.js`). Attempt first, then compare.

## Note
Tests mock any timers/loaders and run offline & deterministically. The live app (`npm run dev`)
uses local data. This pack is **JS only** (no `typecheck` step).
