# Pack 02 — Feature-Build

Implement a missing feature so its tests pass — mirrors real OA/machine-coding
"build this" tasks. Several modules come straight from real interview questions.

## Setup (once)
```bash
npm install
```

## Practice a module
```bash
npm run dev            # menu of all modules in the browser
npm test -- m01        # run ONE module's tests
npm test               # run all
```

## Modules
| # | Task | Source | Topic |
|---|------|--------|-------|
| m01 | Apartment filter chips (AND logic, Clear All) | real OA | derived data, multi-select toggle |
| m02 | Currency converter | real OA (PayPal) | async fetch, dependent effect |
| m03 | Cart management (qty/total) | real OA | list state, derived totals |
| m04 | Schema-driven form | real interview | dynamic controlled form, validation |
| m05 | Star rating | staple | hover + selected state |
| m06 | Todo list | staple | CRUD + filter tabs |
| m07 | Sort control | common | sorting derived list |
| m08 | Client-side search filter | common | text filter, empty state |
| m09 | Multi-step form / stepper | common | step state, per-step validation |
| m10 | Theme toggle via Context | staple | Context API |

Solutions in `solutions/`. Attempt first.
