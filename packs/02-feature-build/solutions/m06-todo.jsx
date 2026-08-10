// SOLUTION — m06 Todo.
import { useState } from "react";

let nextId = 1;

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  function addTodo() {
    const t = text.trim();
    if (!t) return;
    setTodos((prev) => [...prev, { id: nextId++, text: t, done: false }]);
    setText("");
  }
  function toggle(id) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }
  function remove(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  const visible = todos.filter((t) =>
    filter === "active" ? !t.done : filter === "completed" ? t.done : true
  );
  const itemsLeft = todos.filter((t) => !t.done).length;

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
        <button className="btn" data-testid="add-btn" onClick={addTodo}>Add</button>
      </div>

      <ul>
        {visible.map((t) => (
          <li key={t.id} data-testid="todo-item" className={t.done ? "done" : ""}>
            <input
              type="checkbox"
              data-testid={`toggle-${t.id}`}
              checked={t.done}
              onChange={() => toggle(t.id)}
            />
            <span data-testid={`label-${t.id}`} style={{ textDecoration: t.done ? "line-through" : "none" }}>
              {t.text}
            </span>
            <button data-testid={`delete-${t.id}`} onClick={() => remove(t.id)}>×</button>
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
