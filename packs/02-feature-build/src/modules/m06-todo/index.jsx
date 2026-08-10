import { useState } from "react";

/**
 * FEATURE MODULE m06 — Todo list.
 *
 * Implement:
 *   - add a todo (from the input; ignore empty)
 *   - toggle a todo complete/incomplete (click its checkbox)
 *   - delete a todo
 *   - filter tabs: All / Active / Completed
 *   - an "items left" count of active (incomplete) todos
 *
 * Required data-testids:
 *   - new-todo, add-btn
 *   - todo-item (each visible item), toggle-<id>, delete-<id>, label-<id>
 *   - filter-all, filter-active, filter-completed
 *   - items-left
 * Completed items should have a class containing "done".
 */
let nextId = 1;

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  // TODO: addTodo, toggle(id), remove(id)
  // TODO: derive `visible` based on filter, and `itemsLeft`

  const visible = todos; // replace
  const itemsLeft = 0;   // replace

  return (
    <div className="card" style={{ maxWidth: 480 }}>
      <h2>Todos</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          data-testid="new-todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs doing?"
        />
        <button className="btn" data-testid="add-btn" /* onClick={addTodo} */>Add</button>
      </div>

      <ul>
        {visible.map((t) => (
          <li key={t.id} data-testid="todo-item" className={t.done ? "done" : ""}>
            <input type="checkbox" data-testid={`toggle-${t.id}`} checked={t.done} readOnly />
            <span data-testid={`label-${t.id}`} style={{ textDecoration: t.done ? "line-through" : "none" }}>
              {t.text}
            </span>
            <button data-testid={`delete-${t.id}`}>×</button>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", gap: 8 }}>
        <button data-testid="filter-all" onClick={() => setFilter("all")}>All</button>
        <button data-testid="filter-active" onClick={() => setFilter("active")}>Active</button>
        <button data-testid="filter-completed" onClick={() => setFilter("completed")}>Completed</button>
        <span data-testid="items-left">{itemsLeft} left</span>
      </div>
    </div>
  );
}
