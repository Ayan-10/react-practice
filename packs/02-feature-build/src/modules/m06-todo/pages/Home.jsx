import TodoList from "../components/TodoList.jsx";
import { SEED_TASKS } from "../data/tasks.js";

export default function Home() {
  return (
    <section className="dp-page" data-testid="home-page">
      <h1 className="dp-page-title">Today's plan</h1>
      <p className="dp-page-sub">{SEED_TASKS.length} tasks to start with</p>
      {/* The feature under construction lives here. */}
      <TodoList />
    </section>
  );
}
