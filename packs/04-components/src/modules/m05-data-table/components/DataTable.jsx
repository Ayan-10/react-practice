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

  function onSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const filtered = rows.filter((r) =>
    r.name.toLowerCase().includes(filter.toLowerCase())
  );

  const visible = [...filtered];
  if (sortKey) {
    visible.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      let cmp;
      if (typeof av === "string") {
        cmp = av.localeCompare(bv);
      } else {
        cmp = av - bv;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
  }

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
