import TrafficLight from "../components/TrafficLight.jsx";

export default function Home() {
  return (
    <section className="sm-page" data-testid="home-page">
      <h1 className="sm-page-title">Crossing</h1>
      <p className="sm-page-sub">
        Advance the light through its states and watch the walk signal.
      </p>
      <TrafficLight />
    </section>
  );
}
