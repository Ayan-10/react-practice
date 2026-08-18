# m08 — SearchResults · Pagination component (reusable)

**Time box:** ~15 min

You're given a complete **SearchResults** mini-app: a navbar, a paged results
list (Home), and a Saved route — all working. The ONE thing to build is the
reusable, controlled `Pagination` component.

> 👉 The file to edit is **`components/Pagination.jsx`**. Everything else already
> works. The dev menu / tests mount the whole app; Home wires up the demo pager.

Given `totalPages`, `current`, and `onChange`, render a windowed set of page
buttons plus prev/next.

## Folder

```
m08-pagination-component/
  App.jsx                    app root (navbar + routes)
  index.jsx                  entry (re-exports App)
  components/
    Navbar.jsx  Footer.jsx
    Pagination.jsx           👈 BUILD THIS (named export + demo wrapper)
  pages/    Home.jsx  Saved.jsx
  data/results.js            local saved results
  styles.css
```

## Requirements

- Props: `totalPages`, `current` (1-indexed), `onChange(page)`.
- Render page number buttons `data-testid="page-<n>"`. To keep it compact, show
  at most a **window of 5** pages centered on `current` (clamped to valid range).
- The current page button has a class containing `active`.
- `data-testid="prev"` calls `onChange(current-1)`, disabled when `current === 1`.
- `data-testid="next"` calls `onChange(current+1)`, disabled when `current === totalPages`.
- Clicking a page button calls `onChange(n)`.

## Gotchas

- Compute the window start so it never goes below 1 or past totalPages.
- This is CONTROLLED — don't hold page state internally; call `onChange`.

## Run

```
npx vitest run src/modules/m08-pagination-component/
```
