import DependentFetch from "../components/DependentFetch.jsx";
import { MEMBERS } from "../data/team.js";

export default function Home() {
  return (
    <section className="td-page" data-testid="home-page">
      <h1 className="td-page-title">People</h1>
      <p className="td-page-sub">{MEMBERS.length} team members</p>
      {/* The feature under construction lives here (uses its default loaders). */}
      <DependentFetch />
    </section>
  );
}
