import { useState } from "react";
import { SEED_TASKS } from "../data/tasks.js";

/**
 * FEATURE MODULE m06 — Todo list (👈 THIS is the file you build).
 *
 * Read PROMPT.md. Right now this component only shows the seed tasks as a
 * static list — nothing is interactive. You must IMPLEMENT the todo feature:
 *
 *   - ADD a todo from the input (ignore empty / whitespace-only) and clear it.
 *   - TOGGLE a todo complete/incomplete (its checkbox).
 *   - DELETE a todo.
 *   - FILTER tabs: All / Active / Completed.
 *   - "items-left" = number of ACTIVE (not done) todos.
 *
 * REQUIRED data-testids (mandatory for grading):
 *   - new-todo (the text input), add-btn (the Add button)
 *   - todo-item (each VISIBLE list item)
 *   - toggle-<id> (each item's checkbox), delete-<id> (its delete button),
 *     label-<id> (its text label)
 *   - filter-all, filter-active, filter-completed (the tab buttons)
 *   - items-left (the active count)
 * Completed items must have a class CONTAINING "done".
 *
 * Helpers you may find useful live in ../data/tasks.js:
 *   activeCount, filterTasks.
 */
export default function TodoList() {
  const [todos, setTodos] = useState(SEED_TASKS);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  // TODO: implement addTodo (append a new { id, text, done: false } built
  // from the trimmed input, ignore empty/whitespace-only, clear the input),
  // toggle (flip a todo's done flag by id), and remove (delete a todo by id).
  function addTodo() {}

  function toggle(id) {}

  function remove(id) {}

  // TODO: derive `visible` from `todos` based on `filter`
  // (all/active/completed) and `itemsLeft` as the count of not-done todos.
  const visible = todos;
  const itemsLeft = todos.length;

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
