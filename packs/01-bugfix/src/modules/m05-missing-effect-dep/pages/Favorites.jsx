import { Link } from "react-router-dom";
import { CITIES } from "../data/weather.js";

// A second route so navigation is real. (Pretend these are the user's favorite
// cities.) Purely offline, derived from the local dataset.
const FAVORITES = CITIES.slice(0, 3);

export default function Favorites() {
  return (
    <section className="wd-page" data-testid="favorites-page">
      <Link to="/" className="wd-back">← Back to dashboard</Link>
      <h1 className="wd-page-title">Favorite cities</h1>
      <p className="wd-page-sub">{FAVORITES.length} saved cities</p>

      <ul className="wd-fav-list">
        {FAVORITES.map((c) => (
          <li key={c.id} className="wd-fav-row" data-testid="favorite-row">
            {c.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
