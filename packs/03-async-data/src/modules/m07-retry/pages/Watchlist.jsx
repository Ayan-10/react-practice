import { Link } from "react-router-dom";
import CoinCard from "../components/CoinCard.jsx";
import { COINS } from "../data/coins.js";

// A second real route so navigation works. (A hand-picked watchlist.)
// Proves the app is a full mini-app, not a single screen.
const WATCHLIST = COINS.slice(0, 3);

export default function Watchlist() {
  return (
    <section className="ct-page" data-testid="watchlist-page">
      <Link to="/" className="ct-back" data-testid="back-home">
        ← Back to market
      </Link>
      <h1 className="ct-page-title">Your watchlist</h1>
      <p className="ct-page-sub">{WATCHLIST.length} pinned coins</p>
      <div className="ct-grid">
        {WATCHLIST.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </section>
  );
}
