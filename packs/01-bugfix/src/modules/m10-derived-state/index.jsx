import { useState } from "react";

/**
 * BUGFIX MODULE m10 — Derived state stored in state (goes stale).
 *
 * There's a list of items and a text filter. The bug: the filtered list is kept
 * in its OWN state (`visible`) and only recomputed inside the input handler.
 * So when a NEW item is added, the visible list doesn't include it until you
 * touch the filter again — the derived state is stale.
 *
 * Fix by DERIVING the filtered list during render from `items` + `query`
 * (remove the redundant `visible` state), so it's always up to date.
 */
const INITIAL = ["apple", "banana", "cherry"];

export default function DerivedState() {
  const [items, setItems] = useState(INITIAL);
  const [query, setQuery] = useState("");
  // BUG: redundant derived state that gets stale.
  const [visible, setVisible] = useState(INITIAL);
  const [newItem, setNewItem] = useState("");

  function handleQuery(e) {
    const q = e.target.value;
    setQuery(q);
    setVisible(items.filter((it) => it.includes(q)));
  }

  function addItem() {
    if (!newItem.trim()) return;
    setItems((prev) => [...prev, newItem.trim()]);
    // BUG: forgets to update `visible`, so the new item won't show.
    setNewItem("");
  }

  return (
    <div className="card">
      <h2>Filterable list</h2>
      <input
        data-testid="filter"
        value={query}
        onChange={handleQuery}
        placeholder="Filter"
      />
      <div style={{ marginTop: 8 }}>
        <input
          data-testid="new-item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="New item"
        />
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
