import Autocomplete from "../components/Autocomplete.jsx";

export default function Home() {
  return (
    <section className="cp-page" data-testid="home-page">
      <h1 className="cp-page-title">Command palette</h1>
      <p className="cp-page-sub">Start typing to search commands.</p>
      <Autocomplete />
    </section>
  );
}
