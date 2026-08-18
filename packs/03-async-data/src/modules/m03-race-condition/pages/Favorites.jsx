import { Link } from "react-router-dom";
import CityCard from "../components/CityCard.jsx";
import { CITIES } from "../data/cities.js";

export default function Favorites() {
  const favorites = CITIES.slice(0, 2);
  return (
    <div className="ce-favorites" data-testid="favorites-page">
      <h1 className="ce-favorites-title">Your Favorites</h1>
      <div className="ce-card-grid">
        {favorites.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
      <Link className="ce-back-link" data-testid="back-home" to="/">← Back to Explore</Link>
    </div>
  );
}
