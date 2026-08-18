# m05 — SalesTable · Sortable / filterable data table

**Time box:** ~20 min

You're given a complete **SalesTable** mini-app: a navbar, a sortable table
(Home), and a Summary route — all working. The feature to focus on is the data
table.

> 👉 The file to edit is **`components/DataTable.jsx`**. The dev menu / tests
> mount the whole app.

## Folder

```
m05-data-table/
  App.jsx                    app root (navbar + routes)
  index.jsx                  entry (re-exports App)
  components/
    Navbar.jsx  Footer.jsx
    DataTable.jsx            👈 THE FEATURE
  pages/    Home.jsx  Summary.jsx
  data/sales.js              local sales dataset
  styles.css
```

## Requirements

- A `data-testid="filter"` input filters rows by name (case-insensitive
  substring).
- Header buttons `data-testid="sort-name"`, `sort-price`, `sort-rating` sort by
  that column. First click ascending; clicking the same header again toggles to
  descending.
- Each visible row has `data-testid="row-<id>"`, rendered in current sort order.
- `rows` is a prop and defaults to the local `SALES_ROWS`.

## Run

```
npx vitest run src/modules/m05-data-table/
```
