// SOLUTION — m06 DailyPlanner todo list.
// Copy this over components/TodoList.jsx to self-check.
import { useState } from "react";
import { SEED_TASKS } from "../data/tasks.js";

let nextId = 1;

export default function TodoList() {
  const [todos, setTodos] = useState(SEED_TASKS);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  function addTodo() {
    const t = text.trim();
    if (!t) return;
    setTodos((prev) => [...prev, { id: `n${nextId++}`, text: t, done: false }]);
    setText("");
  }

  function toggle(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function remove(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  const visible = todos.filter((t) =>
    filter === "active" ? !t.done : filter === "completed" ? t.done : true
  );
  const itemsLeft = todos.filter((t) => !t.done).length;

  return (
    <div className="dp-feature" data-testid="todo-feature">
      <h2 className="dp-feature-title">Todos</h2>

      <div className="dp-add-row">
        <input
          className="dp-input"
          data-testid="new-todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs doing?"
        />
        <button className="dp-btn" data-testid="add-btn" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul className="dp-list" data-testid="todo-list">
        {visible.map((t) => (
          <li
            key={t.id}
            data-testid="todo-item"
            className={`dp-item${t.done ? " done" : ""}`}
          >
            <input
              type="checkbox"
              data-testid={`toggle-${t.id}`}
              checked={t.done}
              onChange={() => toggle(t.id)}
            />
            <span
              className="dp-label"
              data-testid={`label-${t.id}`}
              style={{ textDecoration: t.done ? "line-through" : "none" }}
            >
              {t.text}
            </span>
            <button
              className="dp-del"
              data-testid={`delete-${t.id}`}
              onClick={() => remove(t.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <div className="dp-footer-row">
        <button
          className="dp-tab"
          data-testid="filter-all"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className="dp-tab"
          data-testid="filter-active"
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className="dp-tab"
          data-testid="filter-completed"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <span className="dp-count" data-testid="items-left">
          {itemsLeft} left
        </span>
      </div>
    </div>
  );
}
