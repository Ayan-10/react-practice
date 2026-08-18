# WeatherDash — Weather doesn't update when you change city

**Time box:** ~10 min · **Difficulty:** core · **Topic:** `useEffect` dependency arrays, effect re-runs, offline async data

## The app
You've been handed **WeatherDash**, a small but complete weather dashboard:

```
m05-missing-effect-dep/
├── App.jsx                    app root (layout + routes)
├── components/
│   ├── Navbar.jsx             top bar (brand + nav links)
│   ├── CityPicker.jsx         dropdown to choose a city
│   ├── WeatherPanel.jsx  👈   THE FILE YOU FIX
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx              city picker + weather panel
│   └── Favorites.jsx        second route (saved cities)
├── data/weather.js          local dataset (offline) + getWeather(city)
└── styles.css
```

Run the pack (`npm run dev`) and open **m05** to see it live: a navbar with a
Dashboard / Favorites nav, a city dropdown, and a weather panel showing the
temperature + condition. Everything works — **except one bug**.

## The bug
Pick a different city in the dropdown. The weather panel keeps showing the
**first** city's weather — it never refetches for the newly selected city.

## Your task
Fix **only** `components/WeatherPanel.jsx` so that:

1. Choosing a different city refetches and shows **that** city's weather
   (temperature and condition).
2. The first city's weather still loads correctly on mount.

## Constraints
- Edit **only** `components/WeatherPanel.jsx`. The rest of the app is correct.
- **Do NOT remove or change any `data-testid`** — the tests depend on them:
  `weather-panel`, `weather-temp`, `weather-condition`.
- Don't restructure the component; the fix is small. Keep the cleanup that
  ignores stale responses.

## How to run
```bash
npm test -- m05
```
Tests mount the **whole app** and drive it like a user. They FAIL first; make
them pass.

## Hints (peek only if stuck)
- The effect that calls `getWeather(city)` has an **empty** dependency array
  (`}, []);`), so it only runs once on mount and never reacts to a new `city`.
- Add `city` to the dependency array: `}, [city]);` so the weather refetches
  whenever the selected city changes.
