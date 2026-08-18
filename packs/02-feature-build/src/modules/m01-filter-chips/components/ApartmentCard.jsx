// Presentational card for a single apartment. Kept dumb on purpose so the
// feature file (FilterChips.jsx) only worries about chips + filtering.
export default function ApartmentCard({ apt }) {
  return (
    <div className="sf-card" data-testid="apartment-card">
      <img
        src={apt.image}
        alt={apt.title}
        className="sf-card-img"
      />
      <div className="sf-card-body">
        <h3 className="sf-card-title" data-testid="apartment-name">
          {apt.title}
        </h3>
        <p className="sf-card-address">{apt.address}</p>
        <div className="sf-card-meta">
          <span>${apt.price}/night</span>
          <span>{"★".repeat(apt.averageRating)}</span>
        </div>
        <p className="sf-card-amenities">{apt.amenities.join(" · ")}</p>
      </div>
    </div>
  );
}
