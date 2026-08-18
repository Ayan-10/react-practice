import PhotoGrid from "../components/PhotoGrid.jsx";

export default function Home() {
  return (
    <section className="pw-home" data-testid="home-page">
      <header className="pw-home-head">
        <h1 className="pw-home-title">The Wall</h1>
        <p className="pw-home-sub">Scroll and load more photos as you go.</p>
      </header>
      <PhotoGrid />
    </section>
  );
}
