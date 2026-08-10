// SOLUTION — m10. Derive the filtered list during render; no redundant state.
import { useState } from "react";

const INITIAL = ["apple", "banana", "cherry"];

export default function DerivedState() {
  const [items, setItems] = useState(INITIAL);
  const [query, setQuery] = useState("");
  const [newItem, setNewItem] = useState("");

  // Derived during render — always fresh.
  const visible = items.filter((it) => it.includes(query));

  function addItem() {
    if (!newItem.trim()) return;
    setItems((prev) => [...prev, newItem.trim()]);
    setNewItem("");
  }

  return (
    <div className="card">
      <h2>Filterable list</h2>
      <input data-testid="filter" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter" />
      <div style={{ marginTop: 8 }}>
        <input data-testid="new-item" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="New item" />
        <button className="btn" data-testid="add" onClick={addItem}>Add</button>
      </div>
      <ul data-testid="list">
        {visible.map((it, i) => (
          <li key={it + i} data-testid="list-item">{it}</li>
        ))}
      </ul>
    </div>
  );
}
