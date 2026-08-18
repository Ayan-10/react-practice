import FilterChips from "../components/FilterChips.jsx";
import { STAYS } from "../data/stays.js";

export default function Home() {
  return (
    <section className="sf-page" data-testid="home-page">
      <h1 className="sf-page-title">Find your stay</h1>
      <p className="sf-page-sub">{STAYS.length} stays available</p>
      {/* The feature under construction lives here. */}
      <FilterChips />
    </section>
  );
}
