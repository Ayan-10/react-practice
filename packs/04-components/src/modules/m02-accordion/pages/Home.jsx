import Accordion from "../components/Accordion.jsx";

export default function Home() {
  return (
    <section className="fq-page" data-testid="home-page">
      <h1 className="fq-page-title">Frequently asked questions</h1>
      <p className="fq-page-sub">Tap a question to reveal its answer.</p>
      <Accordion />
    </section>
  );
}
