// Presentational card for a single coin. Kept dumb on purpose.
export default function CoinCard({ coin }) {
  return (
    <div className="ct-card" data-testid="coin-card">
      <h3 className="ct-card-title" data-testid="coin-name">
        {coin.title}
      </h3>
      <p className="ct-card-symbol">{coin.symbol}</p>
      <div className="ct-card-meta">
        <span>${coin.price}</span>
      </div>
    </div>
  );
}
