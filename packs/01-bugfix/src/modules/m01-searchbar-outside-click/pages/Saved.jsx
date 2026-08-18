import HouseCard from "../components/HouseCard.jsx";
import { HOUSES } from "../data/houses.js";

// A second route so navigation is real. (Pretend these are the user's saved
// homes.) Used to prove the search dropdown closes on route change.
const SAVED = HOUSES.slice(0, 2);

export default function Saved() {
  return (
    <section className="hf-page" data-testid="saved-page">
      <h1 className="hf-page-title">Saved homes</h1>
      <p className="hf-page-sub">{SAVED.length} saved</p>
      <div className="house-grid">
        {SAVED.map((h) => (
          <HouseCard key={h.id} house={h} />
        ))}
      </div>
    </section>
  );
}
