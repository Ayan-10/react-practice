import Tabs from "../components/Tabs.jsx";

export default function Home() {
  return (
    <section className="dv-page" data-testid="home-page">
      <h1 className="dv-page-title">Documentation</h1>
      <p className="dv-page-sub">Browse the docs by tab.</p>
      <Tabs />
    </section>
  );
}
