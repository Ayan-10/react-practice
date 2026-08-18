import Comments from "../components/Comments.jsx";
import { DEFAULT_TREE } from "../data/thread.js";

export default function Home() {
  return (
    <section className="ft-page" data-testid="home-page">
      <h1 className="ft-page-title">Discussion</h1>
      <p className="ft-page-sub">Collapse any comment to hide its replies.</p>
      <Comments comments={DEFAULT_TREE} />
    </section>
  );
}
