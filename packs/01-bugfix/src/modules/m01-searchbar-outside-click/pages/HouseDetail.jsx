import { useParams, Link } from "react-router-dom";
import { HOUSES } from "../data/houses.js";

export default function HouseDetail() {
  const { id } = useParams();
  const house = HOUSES.find((h) => h.id === id);

  if (!house) {
    return (
      <section className="hf-page" data-testid="detail-page">
        <p>House not found.</p>
        <Link to="/">← Back to explore</Link>
      </section>
    );
  }

  return (
    <section className="hf-page" data-testid="detail-page">
      <Link to="/" className="hf-back">← Back to explore</Link>
      <img src={house.image} alt={house.title} className="detail-img" />
      <h1 className="hf-page-title">{house.title}</h1>
      <p className="hf-page-sub">{house.address}</p>
      <div className="detail-meta">
        <span>${house.price}/night</span>
        <span>{"★".repeat(house.rating)}</span>
        <span>{house.beds} beds · {house.baths} baths</span>
      </div>
    </section>
  );
}
