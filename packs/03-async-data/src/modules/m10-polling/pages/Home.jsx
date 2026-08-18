import Poller from "../components/Poller.jsx";

export default function Home() {
  return (
    <section className="sm-page" data-testid="home-page">
      <h1 className="sm-page-title">Service status</h1>
      <p className="sm-page-sub">Auto-refreshing every second.</p>
      {/* The feature under construction lives here (uses its default loader). */}
      <Poller />
    </section>
  );
}
