import ReorderList from "../components/ReorderList.jsx";

export default function Home() {
  return (
    <section className="df-page" data-testid="home-page">
      <h1 className="df-page-title">Board</h1>
      <p className="df-page-sub">Drag tasks to reorder your queue.</p>
      <ReorderList />
    </section>
  );
}
