// Local dataset for the TaskBoard mini-app. Works fully offline.
// In a real OA you'd fetch this; here it's local so the app always renders.
//
// Every task carries a STABLE unique `id`. That id is what should be used as
// the React list key — using the array index instead is the bug in this module.

export const TASKS = [
  { id: "t1", title: "Design landing page", column: "todo", assignee: "Alice" },
  { id: "t2", title: "Fix login redirect", column: "todo", assignee: "Bob" },
  { id: "t3", title: "Write API docs", column: "todo", assignee: "Carol" },
  { id: "t4", title: "Review pull requests", column: "todo", assignee: "Dan" },
];

export const ARCHIVED = [
  { id: "a1", title: "Set up CI pipeline", column: "done", assignee: "Alice" },
  { id: "a2", title: "Migrate to Vite", column: "done", assignee: "Bob" },
];

/**
 * Returns a fresh copy of the active task list so the board can mutate its own
 * state without touching the source data. Mirrors a real "load my tasks" call.
 */
export function loadTasks() {
  return TASKS.map((t) => ({ ...t }));
}
