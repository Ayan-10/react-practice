// SOLUTION — m04 TaskFlow drag-and-drop list reordering (no libraries).
// Copy this over components/ReorderList.jsx to self-check.
import { useState, useRef } from "react";
import { TASKS } from "../data/tasks.js";

export function reorder(list, fromId, toId) {
  if (fromId === toId) return [...list];
  const fromIndex = list.findIndex((it) => it.id === fromId);
  const toIndex = list.findIndex((it) => it.id === toId);
  if (fromIndex === -1 || toIndex === -1) return [...list];
  const next = [...list];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

export default function ReorderList() {
  const [items, setItems] = useState(TASKS);
  const draggedRef = useRef(null);

  const onDragStart = (id) => {
    draggedRef.current = id;
  };
  const onDragOver = (e) => {
    e.preventDefault(); // allow drop
  };
  const onDrop = (id) => {
    const fromId = draggedRef.current;
    if (fromId == null) return;
    setItems((cur) => reorder(cur, fromId, id));
    draggedRef.current = null;
  };
  const onDragEnd = () => {
    draggedRef.current = null;
  };

  const order = items.map((t) => t.id).join(",");

  return (
    <div className="df-reorder card">
      <ul className="df-list" data-testid="reorder-list">
        {items.map((t) => (
          <li
            key={t.id}
            className="df-item"
            data-testid={`item-${t.id}`}
            draggable
            onDragStart={() => onDragStart(t.id)}
            onDragOver={onDragOver}
            onDrop={() => onDrop(t.id)}
            onDragEnd={onDragEnd}
          >
            <span className="df-grip" aria-hidden="true">
              ⠿
            </span>
            <span className="df-item-title">{t.title}</span>
          </li>
        ))}
      </ul>
      <p className="df-order">
        Order: <span data-testid="order">{order}</span>
      </p>
    </div>
  );
}
