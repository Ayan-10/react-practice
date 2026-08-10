import { useMemo, useState } from "react";
import { fallbackApartments } from "../../shared/api.js";

/**
 * FEATURE MODULE m01 — Apartment filter chips.
 *
 * Read PROMPT.md. You must IMPLEMENT the filter chips + filtering logic.
 *
 * Given the already-loaded `apartments`, dynamically generate chips for:
 *   - each unique amenity (e.g. WiFi, Pool, Parking)
 *   - each unique country (LAST comma-separated part of the address)
 *   - rating thresholds "3+", "4+", "5+" (only those relevant to the data)
 *
 * Chips are toggles. Multiple selected chips combine with AND logic.
 * A "Clear All" button appears ONLY when >=1 filter is active and resets all.
 *
 * REQUIRED data-testid format: `filter-chip-{label}` where {label} is the chip
 * label lowercased with spaces replaced by hyphens. Examples:
 *   WiFi        -> filter-chip-wifi
 *   Central Loc -> filter-chip-central-loc
 *   India       -> filter-chip-india
 *   Rating 3+   -> filter-chip-3     (rating chips use just the number: 3/4/5)
 * Also required: `data-testid="clear-all"` for the Clear All button,
 * and each visible apartment card has `data-testid="apartment-card"`.
 *
 * The list of apartments is provided for you (offline fallback data).
 */
const APARTMENTS = fallbackApartments;

function getCountry(address) {
  return address.split(",").pop().trim();
}

export default function FilterChips() {
  const [apartments] = useState(APARTMENTS);

  // TODO: track which filters are active. A good shape:
  //   { amenities: Set, countries: Set, ratings: Set } or a flat array of keys.

  // TODO: derive the available chips from `apartments`:
  //   - amenities: unique across all apartments
  //   - countries: unique getCountry(address)
  //   - ratings: which of [3,4,5] are relevant (any apartment with rating >= n)

  // TODO: compute the visible apartments by AND-combining all active filters.
  const visible = apartments; // <-- replace with filtered result

  return (
    <div>
      <h2>Apartments</h2>

      {/* TODO: render chip groups (amenities, countries, ratings).
          Each chip is a <button> with the required data-testid, and an
          "active" class when selected. */}
      <div className="chip-bar" data-testid="chip-bar">
        {/* implement chips here */}
      </div>

      {/* TODO: render Clear All only when at least one filter is active */}

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
