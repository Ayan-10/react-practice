# Feature: Apartment Filter Chips

**Time box:** ~30 min · **Difficulty:** core/hard · **Topic:** derived data, multi-select toggle state, AND-filtering

## Context
The listing page shows many apartments. Add **smart filter chips** above the list,
generated dynamically from the currently-loaded data. Filtering is **frontend
only** (no new API calls).

## Requirements
1. Generate chips from the loaded apartments:
   - **Amenities**: one chip per unique amenity (WiFi, Pool, Parking, …).
   - **Countries**: one chip per unique country — the **last** comma-separated part
     of the address (e.g. `"123 Ocean Drive, Miami, USA"` → `USA`).
   - **Ratings**: chips for `3+`, `4+`, `5+`, but only those relevant to the data
     (i.e. include `n+` if any apartment has `averageRating >= n`).
2. Each chip is a **toggle**: click to apply, click again to remove.
3. Multiple active chips combine with **AND** logic (must match all).
4. A **Clear All** button appears **only** when ≥1 filter is active; it resets all.
5. Active chips look different from inactive (add an `active` class).

## Required data-testids (mandatory for grading)
- Each chip: `filter-chip-{label}` where `{label}` = label lowercased, spaces → `-`.
  - `WiFi` → `filter-chip-wifi`, `India` → `filter-chip-india`
  - Rating chips use just the number: `3+` → `filter-chip-3`, `4+` → `filter-chip-4`, `5+` → `filter-chip-5`
- Clear All button: `clear-all`
- Each visible apartment card: `apartment-card`

## Run
```bash
npm test -- m01
```

## Hints
- Amenities: `[...new Set(apartments.flatMap(a => a.amenities))]`.
- Country: `address.split(",").pop().trim()`.
- Ratings relevant: `[3,4,5].filter(n => apartments.some(a => a.averageRating >= n))`.
- Track active filters in state; a card is visible if it matches **every** active
  filter across all categories.
