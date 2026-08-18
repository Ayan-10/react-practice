# StayFinder — Build the apartment filter chips

**Time box:** ~30 min · **Difficulty:** core/hard · **Topic:** derived data, multi-select toggle state, AND-filtering

## The app
You've been handed **StayFinder**, a small but complete short-stay rentals app:

```
m01-filter-chips/
├── App.jsx                    app root (layout + routes)
├── components/
│   ├── Navbar.jsx             top bar (brand + nav links)
│   ├── FilterChips.jsx  👈     THE FILE YOU BUILD
│   ├── ApartmentCard.jsx
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx              listing page (renders FilterChips)
│   └── Saved.jsx             second route
├── data/stays.js            local dataset (offline)
└── styles.css
```

Run the pack (`npm run dev`) and open **m01** to see it live: a navbar, a grid
of apartment cards, and a Saved page. Everything works — **except the filter
chips are missing**. Today the listing shows every apartment with no way to
narrow it down.

## Your task
Build **only** `components/FilterChips.jsx` so the listing page gains smart
filter chips above the grid, generated dynamically from the loaded apartments.
Filtering is **frontend only** (no new API calls).

1. Generate chips from the loaded apartments:
   - **Amenities**: one chip per unique amenity (WiFi, Pool, Parking, …).
   - **Countries**: one chip per unique country — the **last** comma-separated
     part of the address (e.g. `"123 Ocean Drive, Miami, USA"` → `USA`).
   - **Ratings**: chips for `3+`, `4+`, `5+`, but only those relevant to the data
     (include `n+` if any apartment has `averageRating >= n`).
2. Each chip is a **toggle**: click to apply, click again to remove.
3. Multiple active chips combine with **AND** logic (a card must match all).
4. A **Clear All** button appears **only** when ≥1 filter is active; it resets all.
5. Active chips look different from inactive (add an `active` class).

## Required data-testids (mandatory for grading)
- Each chip: `filter-chip-{label}` where `{label}` = label lowercased, spaces → `-`.
  - `WiFi` → `filter-chip-wifi`, `India` → `filter-chip-india`
  - Rating chips use just the number: `3+` → `filter-chip-3`, `4+` → `filter-chip-4`, `5+` → `filter-chip-5`
- Clear All button: `clear-all`
- Each visible apartment card: `apartment-card` (already provided by `ApartmentCard`)
- Keep the list container id: `apartment-list`

## How to run
```bash
npm test -- m01
```
Tests mount the **whole app** and drive it like a user. The app renders on the
stub; the feature tests FAIL first — make them pass.

## Hints (peek only if stuck)
- Helpers live in `../data/stays.js`: `getCountry`, `uniqueAmenities`,
  `uniqueCountries`, `relevantRatings`.
- Amenities: `[...new Set(apartments.flatMap(a => a.amenities))]`.
- Country: `address.split(",").pop().trim()`.
- Ratings relevant: `[3,4,5].filter(n => apartments.some(a => a.averageRating >= n))`.
- Track active filters in state (e.g. a `Set` per category); a card is visible
  if it matches **every** active filter across all categories.
- Don't define a chip component *inside* render — it remounts on every state
  change and can drop the click you just made. Build the chip markup inline.
