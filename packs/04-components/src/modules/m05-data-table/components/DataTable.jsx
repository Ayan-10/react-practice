import { useState } from "react";
import { SALES_ROWS } from "../data/sales.js";

/**
 * THE FEATURE — m05 SalesTable data table.
 *
 * `rows` defaults to the local offline dataset so the feature renders on its
 * own. Supports name filtering (case-insensitive) and click-to-sort headers
 * (first click ascending, second click on the same column descending).
 *
 * REQUIRED data-testids: filter, sort-name, sort-price, sort-rating,
 * row-<id> (per visible row).
 */
export default function DataTable({ rows = SALES_ROWS }) {
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  // TODO: implement onSort(key) — first click on a column sorts ascending,
  // a second click on the SAME column flips to descending, clicking a
  // different column resets to ascending on that column.
  function onSort() {}

  // TODO: filter `rows` by a case-insensitive substring match of `filter`
  // against each row's name, then (if a sortKey is set) sort a copy by that
  // key/direction (localeCompare for strings, numeric subtraction otherwise).
  const visible = rows;

  return (
    <div>
      <h2>Products</h2>
      <input
        className="st-filter"
        data-testid="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by name..."
      />
      <table className="st-table">
        <thead>
          <tr>
            <th><button data-testid="sort-name" onClick={() => onSort("name")}>Name</button></th>
            <th><button data-testid="sort-price" onClick={() => onSort("price")}>Price</button></th>
            <th><button data-testid="sort-rating" onClick={() => onSort("rating")}>Rating</button></th>
          </tr>
        </thead>
        <tbody>
          {visible.map((r) => (
            <tr key={r.id} data-testid={`row-${r.id}`}>
              <td>{r.name}</td>
              <td>{r.price}</td>
              <td>{r.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
