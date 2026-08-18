import { useState } from "react";
import {
  STAYS,
  getCountry,
  uniqueAmenities,
  uniqueCountries,
  relevantRatings,
} from "../data/stays.js";
import ApartmentCard from "./ApartmentCard.jsx";

const slug = (label) => String(label).toLowerCase().replace(/\s+/g, "-");

export default function FilterChips() {
  const [apartments] = useState(STAYS);
  const [amenities, setAmenities] = useState(() => new Set());
  const [countries, setCountries] = useState(() => new Set());
  const [ratings, setRatings] = useState(() => new Set());

  const amenityChips = uniqueAmenities(apartments);
  const countryChips = uniqueCountries(apartments);
  const ratingChips = relevantRatings(apartments);

  const toggle = (setter) => (value) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const toggleAmenity = toggle(setAmenities);
  const toggleCountry = toggle(setCountries);
  const toggleRating = toggle(setRatings);

  const anyActive =
    amenities.size > 0 || countries.size > 0 || ratings.size > 0;

  const clearAll = () => {
    setAmenities(new Set());
    setCountries(new Set());
    setRatings(new Set());
  };

  const visible = apartments.filter((apt) => {
    const amenityOk = [...amenities].every((a) => apt.amenities.includes(a));
    const countryOk =
      countries.size === 0 || countries.has(getCountry(apt.address));
    const ratingOk = [...ratings].every((n) => apt.averageRating >= n);
    return amenityOk && countryOk && ratingOk;
  });

  return (
    <div className="sf-feature">
      <h2 className="sf-feature-title">Apartments</h2>

      <div className="sf-chip-bar" data-testid="chip-bar">
        {amenityChips.map((a) => (
          <button
            key={`amenity-${a}`}
            type="button"
            data-testid={`filter-chip-${slug(a)}`}
            className={`sf-chip${amenities.has(a) ? " active" : ""}`}
            onClick={() => toggleAmenity(a)}
          >
            {a}
          </button>
        ))}
        {countryChips.map((c) => (
          <button
            key={`country-${c}`}
            type="button"
            data-testid={`filter-chip-${slug(c)}`}
            className={`sf-chip${countries.has(c) ? " active" : ""}`}
            onClick={() => toggleCountry(c)}
          >
            {c}
          </button>
        ))}
        {ratingChips.map((n) => (
          <button
            key={`rating-${n}`}
            type="button"
            data-testid={`filter-chip-${n}`}
            className={`sf-chip${ratings.has(n) ? " active" : ""}`}
            onClick={() => toggleRating(n)}
          >
            {n}+
          </button>
        ))}
      </div>

      {anyActive && (
        <button
          type="button"
          className="sf-clear-all"
          data-testid="clear-all"
          onClick={clearAll}
        >
          Clear All
        </button>
      )}

      <div className="sf-grid" data-testid="apartment-list">
        {visible.map((apt) => (
          <ApartmentCard key={apt._id} apt={apt} />
        ))}
      </div>
    </div>
  );
}
