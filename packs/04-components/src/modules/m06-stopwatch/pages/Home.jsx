import Stopwatch from "../components/Stopwatch.jsx";

export default function Home() {
  return (
    <section className="gt-page" data-testid="home-page">
      <h1 className="gt-page-title">Workout timer</h1>
      <p className="gt-page-sub">Track your sets, one tick at a time.</p>
      <Stopwatch />
    </section>
  );
}
