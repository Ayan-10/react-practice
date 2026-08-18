import TaskList from "../components/TaskList.jsx";

export default function Home() {
  return (
    <section className="tb-page" data-testid="home-page">
      <h1 className="tb-page-title">To do</h1>
      <p className="tb-page-sub">
        Check off what's done, delete what's dropped.
      </p>
      <TaskList />
    </section>
  );
}
