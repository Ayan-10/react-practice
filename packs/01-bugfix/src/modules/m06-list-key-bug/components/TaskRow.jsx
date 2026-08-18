import { useState } from "react";

/**
 * A single task row on the board.
 *
 * IMPORTANT: this row holds its OWN local state — the `done` checkbox — which
 * must stay tied to THIS task. Because the state lives inside the component
 * instance (not in the parent's data), React's reconciliation relies entirely
 * on the list `key` to keep each instance matched to the right task. If the
 * parent renders this list with the array index as the key, deleting a row
 * makes React reuse this instance (and its checkbox state) for a DIFFERENT
 * task — the classic "state leaks to the wrong row" bug.
 *
 * data-testids (tests depend on them):
 *   row-<id>, title-<id>, done-<id>, remove-<id>
 */
export default function TaskRow({ task, onRemove }) {
  // Local per-row state that must follow THIS task, keyed by list identity.
  const [done, setDone] = useState(false);

  return (
    <li
      data-testid={`row-${task.id}`}
      className={done ? "tb-task tb-task-done" : "tb-task"}
    >
      <input
        type="checkbox"
        data-testid={`done-${task.id}`}
        className="tb-check"
        checked={done}
        onChange={(e) => setDone(e.target.checked)}
        aria-label={`Mark ${task.title} done`}
      />
      <span className="tb-task-title" data-testid={`title-${task.id}`}>
        {task.title}
      </span>
      <span className="tb-task-assignee">{task.assignee}</span>
      <button
        type="button"
        data-testid={`remove-${task.id}`}
        className="tb-remove"
        onClick={onRemove}
      >
        Delete
      </button>
    </li>
  );
}
