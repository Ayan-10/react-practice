import Demo from "../components/Demo.jsx";

export default function Home() {
  return (
    <section className="hb-page" data-testid="home-page">
      <h1 className="hb-page-title">Playground</h1>
      <p className="hb-page-sub">Try the hooks: toggle, debounce, previous, persist.</p>
      <Demo />
    </section>
  );
}
