// Local dataset for the DailyPlanner mini-app. Works fully offline.
// A tiny set of starter tasks so the planner isn't empty on first load.
// These seed the TodoList feature you build in components/TodoList.jsx.
//
//   t1 Water the plants   — done
//   t2 Reply to emails    — active
//   t3 Plan the sprint    — active

export const SEED_TASKS = [
  { id: "t1", text: "Water the plants", done: true },
  { id: "t2", text: "Reply to emails", done: false },
  { id: "t3", text: "Plan the sprint", done: false },
];

/** How many of the given tasks are still active (not done). */
export function activeCount(tasks = SEED_TASKS) {
  return tasks.filter((t) => !t.done).length;
}

/** Filter tasks by tab: "all" | "active" | "completed". */
export function filterTasks(tasks = SEED_TASKS, filter = "all") {
  return tasks.filter((t) =>
    filter === "active" ? !t.done : filter === "completed" ? t.done : true
  );
}
