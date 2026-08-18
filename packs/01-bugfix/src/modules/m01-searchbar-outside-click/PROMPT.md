# HouseFinder — Search dropdown won't close

**Time box:** ~20 min · **Difficulty:** core · **Topic:** `useRef`, DOM event listeners, `useEffect` cleanup, router side effects

## The app
You've been handed **HouseFinder**, a small but complete house-listing app:

```
m01-searchbar-outside-click/
├── App.jsx                    app root (layout + routes)
├── components/
│   ├── Navbar.jsx             top bar (brand + search + nav links)
│   ├── SearchBar.jsx   👈     THE FILE YOU FIX
│   ├── HouseCard.jsx
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx              listing grid
│   ├── Saved.jsx            second route
│   └── HouseDetail.jsx      /house/:id
├── data/houses.js           local dataset (offline)
└── styles.css
```

Run the pack (`npm run dev`) and open **m01** to see it live: a navbar with a
search box, a grid of house cards, a Saved page, and detail pages. Everything
works — **except one bug**.

## The bug
Type in the navbar search → a results dropdown opens. But once open, it
**stays open**:
- it does **not** close when you click elsewhere on the page, and
- it does **not** close when you navigate to another route (e.g. Saved).

## Your task
Fix **only** `components/SearchBar.jsx` so that:

1. Clicking **outside** the search area closes the dropdown.
2. Clicking **inside** the search area (input or a result) does **not** close it.
3. Changing route (navigation) closes the dropdown.

## Constraints
- Edit **only** `components/SearchBar.jsx`. The rest of the app is correct.
- **Do NOT remove or change any `data-testid`** — the tests depend on them:
  `search-input`, `search-div`, `house-search-result`.
- Frontend only. Add listeners and **clean them up** on unmount.

## How to run
```bash
npm test -- m01
```
Tests mount the **whole app** and drive it like a user. They FAIL first; make
them pass.

## Hints (peek only if stuck)
- Attach a `mousedown` listener to `document` inside a `useEffect`; if the click
  target is not inside `searchRef.current`, call `setOpen(false)`. Return a
  cleanup that removes the listener.
- Add a second `useEffect` with `[location.pathname]` as the dependency that
  calls `setOpen(false)` on route change.
