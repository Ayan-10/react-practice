import { Link } from "react-router-dom";
import ApartmentCard from "../components/ApartmentCard.jsx";
import { STAYS } from "../data/stays.js";

// A second real route so navigation works. (Pretend these are the stays the
// user bookmarked.) Proves the app is a full mini-app, not a single screen.
const SAVED = STAYS.slice(0, 2);

export default function Saved() {
  return (
    <section className="sf-page" data-testid="saved-page">
      <Link to="/" className="sf-back" data-testid="back-home">
        ← Back to explore
      </Link>
      <h1 className="sf-page-title">Saved stays</h1>
      <p className="sf-page-sub">{SAVED.length} saved</p>
      <div className="sf-grid">
        {SAVED.map((apt) => (
          <ApartmentCard key={apt._id} apt={apt} />
        ))}
      </div>
    </section>
  );
}
