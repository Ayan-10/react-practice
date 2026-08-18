import History from "../components/History.jsx";

export default function Home() {
  return (
    <section className="ur-page" data-testid="home-page">
      <h1 className="ur-page-title">Editor</h1>
      <p className="ur-page-sub">Change the value, then undo / redo your edits.</p>
      <History />
    </section>
  );
}
