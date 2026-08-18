import HouseCard from "../components/HouseCard.jsx";
import { HOUSES } from "../data/houses.js";

export default function Home() {
  return (
    <section className="hf-page" data-testid="home-page">
      <h1 className="hf-page-title">Explore homes</h1>
      <p className="hf-page-sub">{HOUSES.length} stays available</p>
      <div className="house-grid">
        {HOUSES.map((h) => (
          <HouseCard key={h.id} house={h} />
        ))}
      </div>
    </section>
  );
}
