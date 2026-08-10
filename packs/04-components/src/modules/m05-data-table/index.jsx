import { useState } from "react";

const DEFAULT_ROWS = [
  { id: 1, name: "Mouse", price: 25, rating: 4.5 },
  { id: 2, name: "Keyboard", price: 75, rating: 4.8 },
  { id: 3, name: "Monitor", price: 200, rating: 4.2 },
];

/**
 * MODULE m05 — Data table. Read PROMPT.md.
 */
export default function DataTable({ rows = DEFAULT_ROWS }) {
  const [filter, setFilter] = useState("");
  // TODO: track sort key + direction.

  // TODO: compute visible = rows filtered by name, then sorted by key/dir.
  const visible = rows;

  return (
    <div>
      <h2>Products</h2>
      <input
        data-testid="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by name..."
      />
      <table>
        <thead>
          <tr>
            <th><button data-testid="sort-name">Name</button></th>
            <th><button data-testid="sort-price">Price</button></th>
            <th><button data-testid="sort-rating">Rating</button></th>
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
