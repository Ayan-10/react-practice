// SOLUTION — m06 TaskBoard list-key identity.
// This is the FIXED version of components/TaskList.jsx. Attempt it yourself
// first, then compare. To self-check: copy this over components/TaskList.jsx.
import { useState } from "react";
import TaskRow from "./TaskRow.jsx";
import { loadTasks } from "../data/tasks.js";

export default function TaskList() {
  const [tasks, setTasks] = useState(() => loadTasks());

  function remove(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <ul className="tb-task-list" data-testid="task-list">
      {tasks.map((task) => (
        // FIX: use the STABLE unique task id as the key (not the array index),
        // so React keeps each TaskRow instance — and its "done" checkbox state —
        // matched to the same task across deletions.
        <TaskRow
          key={task.id}
          task={task}
          onRemove={() => remove(task.id)}
        />
      ))}
    </ul>
  );
}
