import { Link } from "react-router-dom";
import SneakerCard from "../components/SneakerCard.jsx";
import { SNEAKERS } from "../data/sneakers.js";

// A second real route so navigation works. (Pretend these are on sale.)
// Proves the app is a full mini-app, not a single screen.
const DEALS = SNEAKERS.slice(0, 2);

export default function Deals() {
  return (
    <section className="ss-page" data-testid="deals-page">
      <Link to="/" className="ss-back" data-testid="back-home">
        ← Back to shop
      </Link>
      <h1 className="ss-page-title">Today's deals</h1>
      <p className="ss-page-sub">{DEALS.length} on sale</p>
      <div className="ss-grid">
        {DEALS.map((sneaker) => (
          <SneakerCard key={sneaker.id} sneaker={sneaker} />
        ))}
      </div>
    </section>
  );
}
