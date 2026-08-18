import { useState } from "react";
import TaskRow from "./TaskRow.jsx";
import { loadTasks } from "../data/tasks.js";

/**
 * 🐞 THIS IS THE FILE YOU NEED TO FIX.
 *
 * The board renders a list of tasks. Each row (TaskRow) keeps its OWN local
 * state — a "done" checkbox. Everything looks fine until you DELETE a row:
 * check off a task, delete a DIFFERENT task above it, and the checkmark
 * suddenly appears on the WRONG task.
 *
 * BUG: this list uses the array INDEX as the React `key`. When a task is
 * removed, every row below it shifts up one index, so React matches the old
 * component instances (and their checkbox state) to the wrong tasks. The
 * per-row state "leaks" to a neighbour.
 *
 * Everything else in this project already works — only edit this component.
 *
 * DO NOT change or remove any existing data-testid attributes:
 *   task-list, row-<id>, title-<id>, done-<id>, remove-<id>
 */
export default function TaskList() {
  const [tasks, setTasks] = useState(() => loadTasks());

  function remove(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <ul className="tb-task-list" data-testid="task-list">
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          onRemove={() => remove(task.id)}
        />
      ))}
    </ul>
  );
}
