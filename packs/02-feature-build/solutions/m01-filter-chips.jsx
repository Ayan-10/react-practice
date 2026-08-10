// SOLUTION — m01 Filter chips.
import { useMemo, useState } from "react";
import { fallbackApartments } from "../../shared/api.js";

const APARTMENTS = fallbackApartments;
const getCountry = (address) => address.split(",").pop().trim();
const chipId = (label) => `filter-chip-${String(label).toLowerCase().replace(/\s+/g, "-")}`;

export default function FilterChips() {
  const [apartments] = useState(APARTMENTS);
  const [amenities, setAmenities] = useState(new Set());
  const [countries, setCountries] = useState(new Set());
  const [ratings, setRatings] = useState(new Set());

  const amenityChips = useMemo(
    () => [...new Set(apartments.flatMap((a) => a.amenities))],
    [apartments]
  );
  const countryChips = useMemo(
    () => [...new Set(apartments.map((a) => getCountry(a.address)))],
    [apartments]
  );
  const ratingChips = useMemo(
    () => [3, 4, 5].filter((n) => apartments.some((a) => a.averageRating >= n)),
    [apartments]
  );

  const anyActive = amenities.size + countries.size + ratings.size > 0;

  function toggle(setter, value) {
    setter((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  }

  function clearAll() {
    setAmenities(new Set());
    setCountries(new Set());
    setRatings(new Set());
  }

  const visible = apartments.filter((a) => {
    const amenityOk = [...amenities].every((am) => a.amenities.includes(am));
    const countryOk = countries.size === 0 || countries.has(getCountry(a.address));
    const ratingOk = [...ratings].every((n) => a.averageRating >= n);
    return amenityOk && countryOk && ratingOk;
  });

  // NOTE: build chip markup inline (do NOT define a component inside render —
  // that remounts on every state change and can drop the just-clicked state).
  const chipStyle = (active) => ({
    padding: "6px 12px",
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 999,
    border: "1px solid #6c5ce7",
    background: active ? "#6c5ce7" : "#fff",
    color: active ? "#fff" : "#6c5ce7",
  });

  return (
    <div>
      <h2>Apartments</h2>
      <div className="chip-bar" data-testid="chip-bar">
        {amenityChips.map((am) => {
          const active = amenities.has(am);
          return (
            <button key={am} data-testid={chipId(am)} className={`chip${active ? " active" : ""}`}
              onClick={() => toggle(setAmenities, am)} style={chipStyle(active)}>
              {am}
            </button>
          );
        })}
        {countryChips.map((c) => {
          const active = countries.has(c);
          return (
            <button key={c} data-testid={chipId(c)} className={`chip${active ? " active" : ""}`}
              onClick={() => toggle(setCountries, c)} style={chipStyle(active)}>
              {c}
            </button>
          );
        })}
        {ratingChips.map((n) => {
          const active = ratings.has(n);
          return (
            <button key={n} data-testid={`filter-chip-${n}`} className={`chip${active ? " active" : ""}`}
              onClick={() => toggle(setRatings, n)} style={chipStyle(active)}>
              {n}+
            </button>
          );
        })}
        {anyActive && (
          <button data-testid="clear-all" className="btn secondary" onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>

      <div className="grid" data-testid="apartment-list" style={{ marginTop: 16 }}>
        {visible.map((apt) => (
          <div key={apt._id} className="card" data-testid="apartment-card">
            <img src={apt.image} alt={apt.title} style={{ width: "100%", borderRadius: 8 }} />
            <h3 data-testid="apartment-name">{apt.title}</h3>
            <p>{apt.address}</p>
            <p>${apt.price} · ⭐ {apt.averageRating}</p>
            <p>{apt.amenities.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
