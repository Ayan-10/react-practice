// Presentational card for a single sneaker. Kept dumb on purpose.
export default function SneakerCard({ sneaker }) {
  return (
    <div className="ss-card" data-testid="sneaker-card">
      <img src={sneaker.image} alt={sneaker.title} className="ss-card-img" />
      <div className="ss-card-body">
        <h3 className="ss-card-title" data-testid="sneaker-name">
          {sneaker.title}
        </h3>
        <p className="ss-card-brand">{sneaker.brand}</p>
        <div className="ss-card-meta">
          <span>${sneaker.price}</span>
        </div>
      </div>
    </div>
  );
}
