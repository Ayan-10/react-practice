# MovieRatings — Build the interactive star rating

**Time box:** ~15 min · **Difficulty:** warmup/core · **Topic:** hover preview + selected state

## The app
You've been handed **MovieRatings**, a small but complete film-rating app:

```
m05-star-rating/
├── App.jsx                    app root (layout + routes)
├── components/
│   ├── Navbar.jsx             top bar (brand + nav links)
│   ├── StarRating.jsx  👈      THE FILE YOU BUILD
│   ├── MovieCard.jsx
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx              rate screen (renders StarRating)
│   └── Ratings.jsx          second route (already-rated movies)
├── data/movies.js           local dataset (offline)
└── styles.css
```

Run the pack (`npm run dev`) and open **m05** to see it live: a navbar, a
featured movie (*Interstellar*), a row of stars, and a "My Ratings" page.
Everything works — **except the stars are dead**. Today they render grey and
never react to clicks or hover, and the rating value stays at `0`.

## Your task
Build **only** `components/StarRating.jsx` so the widget becomes interactive:

1. **Click** a star sets the rating to that value and calls `onChange(value)`
   (the Home page uses this to show a "You gave … n/5" summary).
2. **Hover** a star previews the fill up to that star.
3. **Mouse leave** the star row restores the fill to the actual selected value.
4. A star is **filled** when `n <= (hovered || selected)`; filled stars must have
   a class containing `filled`.

## Required data-testids (mandatory for grading)
- Each star: `star-{n}` for `n` in `1..5` (already provided — keep them).
- Current value: `rating-value` shows the selected number (already provided).

## How to run
```bash
npm test -- m05
```
Tests mount the **whole app** and drive it like a user. The app renders on the
stub; the feature tests FAIL first — make them pass.

## Hints (peek only if stuck)
- Two states: `selected` and `hovered` (0 when not hovering).
- `filled = n <= (hovered || selected)`.
- Put `onMouseLeave={() => setHovered(0)}` on the **row** wrapping the stars, and
  `onMouseEnter={() => setHovered(n)}` / `onClick` on each star.
- Don't forget to call `onChange(n)` inside the click handler.
