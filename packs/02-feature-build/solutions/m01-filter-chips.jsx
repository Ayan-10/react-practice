// SOLUTION — m01 StayFinder Filter chips.
// Copy this over components/FilterChips.jsx to self-check.
//
// (Paths are relative to components/, i.e. where this file is copied to.)
import { useMemo, useState } from "react";
import {
  STAYS,
  getCountry,
  uniqueAmenities,
  uniqueCountries,
  relevantRatings,
} from "../data/stays.js";
import ApartmentCard from "./ApartmentCard.jsx";

const chipId = (label) =>
  `filter-chip-${String(label).toLowerCase().replace(/\s+/g, "-")}`;

export default function FilterChips() {
  const [apartments] = useState(STAYS);
  const [amenities, setAmenities] = useState(new Set());
  const [countries, setCountries] = useState(new Set());
  const [ratings, setRatings] = useState(new Set());

  const amenityChips = useMemo(() => uniqueAmenities(apartments), [apartments]);
  const countryChips = useMemo(() => uniqueCountries(apartments), [apartments]);
  const ratingChips = useMemo(() => relevantRatings(apartments), [apartments]);

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
    const countryOk =
      countries.size === 0 || countries.has(getCountry(a.address));
    const ratingOk = [...ratings].every((n) => a.averageRating >= n);
    return amenityOk && countryOk && ratingOk;
  });

  return (
    <div className="sf-feature">
      <h2 className="sf-feature-title">Apartments</h2>

      <div className="sf-chip-bar" data-testid="chip-bar">
        {amenityChips.map((am) => {
          const active = amenities.has(am);
          return (
            <button
              key={am}
              data-testid={chipId(am)}
              className={`sf-chip${active ? " active" : ""}`}
              onClick={() => toggle(setAmenities, am)}
            >
              {am}
            </button>
          );
        })}
        {countryChips.map((c) => {
          const active = countries.has(c);
          return (
            <button
              key={c}
              data-testid={chipId(c)}
              className={`sf-chip${active ? " active" : ""}`}
              onClick={() => toggle(setCountries, c)}
            >
              {c}
            </button>
          );
        })}
        {ratingChips.map((n) => {
          const active = ratings.has(n);
          return (
            <button
              key={n}
              data-testid={`filter-chip-${n}`}
              className={`sf-chip${active ? " active" : ""}`}
              onClick={() => toggle(setRatings, n)}
            >
              {n}+
            </button>
          );
        })}
        {anyActive && (
          <button
            data-testid="clear-all"
            className="sf-clear-all"
            onClick={clearAll}
          >
            Clear All
          </button>
        )}
      </div>

      <div className="sf-grid" data-testid="apartment-list">
        {visible.map((apt) => (
          <ApartmentCard key={apt._id} apt={apt} />
        ))}
      </div>
    </div>
  );
}
