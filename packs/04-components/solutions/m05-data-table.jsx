// SOLUTION — m05 Data table (sort + filter).
import { useMemo, useState } from "react";

const DEFAULT_ROWS = [
  { id: 1, name: "Mouse", price: 25, rating: 4.5 },
  { id: 2, name: "Keyboard", price: 75, rating: 4.8 },
  { id: 3, name: "Monitor", price: 200, rating: 4.2 },
];

export default function DataTable({ rows = DEFAULT_ROWS }) {
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [dir, setDir] = useState("asc");

  function onSort(key) {
    if (sortKey === key) {
      setDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDir("asc");
    }
  }

  const visible = useMemo(() => {
    const f = filter.trim().toLowerCase();
    let out = rows.filter((r) => r.name.toLowerCase().includes(f));
    if (sortKey) {
      out = [...out].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        let cmp;
        if (typeof av === "string") cmp = av.localeCompare(bv);
        else cmp = av - bv;
        return dir === "asc" ? cmp : -cmp;
      });
    }
    return out;
  }, [rows, filter, sortKey, dir]);

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
