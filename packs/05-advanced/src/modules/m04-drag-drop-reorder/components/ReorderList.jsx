import { useState, useRef } from "react";
import { TASKS } from "../data/tasks.js";

/**
 * THE FEATURE TO BUILD — m04 TaskFlow drag-and-drop list reordering (no libs).
 *
 * Two things to implement:
 *
 * 1) A PURE helper `reorder(list, fromId, toId)` that returns a NEW array with
 *    the item whose id === fromId moved to the index currently held by toId.
 *    - Moving down or up must both work.
 *    - fromId === toId is a no-op (return an equivalent array).
 *    - Never mutate the input array or its items.
 *
 * 2) The HTML5 drag handlers below, wired to each <li>:
 *    - onDragStart(id) → remember the dragged id (draggedRef).
 *    - onDragOver(e)   → e.preventDefault() so a drop is allowed.
 *    - onDrop(id)      → setItems(reorder(items, draggedId, id)).
 *    - onDragEnd()     → clear the dragged id.
 *
 * REQUIRED data-testids:
 *   - reorder-list         (the <ul> container)
 *   - item-<id>            (each draggable <li>, in DOM order)
 *   - order               (an element whose text is the ids joined by ",")
 *
 * Export `reorder` (the test unit-tests it directly) and the default component.
 */
export function reorder(list, fromId, toId) {
  // TODO: return a NEW array with `fromId` moved to `toId`'s index.
  return list;
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
