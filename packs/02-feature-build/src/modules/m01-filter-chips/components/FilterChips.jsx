// TODO: implement the StayFinder filter chips (see PROMPT.md).
// Build filter chips above the apartment grid, generated from the loaded stays:
//   - one chip per unique amenity, one per unique country (last comma part of
//     address), and rating chips 3+/4+/5+ (only those relevant to the data).
//   - each chip toggles on/off; multiple active chips combine with AND logic.
//   - a "clear-all" button appears only when >=1 filter is active and resets all.
// Required testids: filter-chip-{label} (spaces -> "-"), rating chips
//   filter-chip-{n}, clear-all, and keep the apartment-list container.
import { useState } from "react";
import { STAYS, uniqueAmenities } from "../data/stays.js";
import ApartmentCard from "./ApartmentCard.jsx";

export default function FilterChips() {
  const [apartments] = useState(STAYS);
  const [amenities, setAmenities] = useState(new Set());

  // TODO: derive amenity/country/rating chips and track active filters,
  // then compute the visible apartments via AND filtering.
  const visible = apartments.filter((a) => {
    const amenityOk = [...amenities].every((am) => a.amenities.includes(am));
    return amenityOk;
  });

  const uniqueAmenitiesList = uniqueAmenities(apartments);

  function toggle(setter, value) {
    setter((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    })
  }

  return (
    <div className="sf-feature">
      <h2 className="sf-feature-title">Apartments</h2>

      <div className="sf-chip-bar" data-testid="chip-bar">
        {
          uniqueAmenitiesList.map((am) => {
            const active = amenities.has(am);

            return (
              <button
                key={am}
                data-testid={`filter-chip-${am.toLowerCase().replace(/\s+/g, "-")}`}
                className={`sf-chip ${active ? "sf-chip-active" : ""}`}
                onClick={() => {
                  return toggle(setAmenities, am);
                }}
              >
                {am}
              </button>
            );
          })
        }
        {/* TODO: render amenity, country and rating chips + Clear All */}
      </div>

      <div className="sf-grid" data-testid="apartment-list">
        {visible.map((apt) => (
          <ApartmentCard key={apt._id} apt={apt} />
        ))}
      </div>
    </div>
  );
}
