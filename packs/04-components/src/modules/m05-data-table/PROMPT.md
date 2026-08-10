# m05 — Data table (sort + filter)

**Time box:** ~18 min

Build a table over `rows` (`{ id, name, price, rating }`). Support clicking a
column header to sort by it (toggle asc/desc), plus a text filter over `name`.

## Requirements

- Rows: `data-testid="row-<id>"`; render them in current sorted/filtered order.
- Header buttons: `data-testid="sort-name"`, `sort-price`, `sort-rating`.
- Clicking a header sorts ascending by that column; clicking the SAME header
  again toggles to descending.
- Filter input `data-testid="filter"`: case-insensitive substring match on name;
  only matching rows render.
- Sorting and filtering compose (filter first, then sort — order-independent for
  correctness).

## Gotchas

- Don't mutate `rows`; copy before sorting (`[...rows].sort`).
- Track both the sort key and direction.
