import Wizard from "../components/Wizard.jsx";

export default function Home() {
  return (
    <section className="af-page" data-testid="home-page">
      <h1 className="af-page-title">Apply</h1>
      <p className="af-page-sub">
        Complete the three steps to submit your application.
      </p>
      <Wizard />
    </section>
  );
}
