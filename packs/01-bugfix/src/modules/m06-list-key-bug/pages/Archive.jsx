import { ARCHIVED } from "../data/tasks.js";

// A second route so navigation is real. These are completed tasks that have
// been archived off the board.
export default function Archive() {
  return (
    <section className="tb-page" data-testid="archive-page">
      <h1 className="tb-page-title">Archive</h1>
      <p className="tb-page-sub">{ARCHIVED.length} completed tasks</p>
      <ul className="tb-task-list">
        {ARCHIVED.map((task) => (
          <li key={task.id} className="tb-task tb-task-done">
            <span className="tb-check tb-check-static">✓</span>
            <span className="tb-task-title">{task.title}</span>
            <span className="tb-task-assignee">{task.assignee}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
