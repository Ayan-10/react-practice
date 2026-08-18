import GifSearch from "../components/GifSearch.jsx";

export default function Home() {
  return (
    <section className="gs-home" data-testid="home-page">
      <h1 className="gs-home-heading">Find the perfect GIF</h1>
      <p className="gs-home-sub">Type to search. Results update as you stop typing.</p>
      <GifSearch />
    </section>
  );
}
