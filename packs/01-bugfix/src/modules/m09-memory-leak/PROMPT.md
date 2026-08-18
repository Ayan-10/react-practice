# LiveFeed — Ticker subscription never cleans up (memory leak)

**Time box:** ~10 min · **Difficulty:** medium · **Topic:** `useEffect` cleanup, subscriptions

## The app
You've been handed **LiveFeed**, a small but complete live-activity app:

```
m09-memory-leak/
├── App.jsx                    app root (layout + routes)
├── components/
│   ├── Navbar.jsx             brand + nav links (Live / Archive)
│   ├── FeedTicker.jsx   👈     THE FILE YOU FIX
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx              live page + "Pause feed" toggle
│   └── Archive.jsx           second route (past notifications)
├── data/feed.js              offline pub/sub event source
└── styles.css
```

Run the pack (`npm run dev`) and open **m09**: a navbar, a live activity ticker
that streams new events every second, and an Archive route. Everything works —
**except one bug**.

## The bug
`FeedTicker` opens a subscription on mount (an interval-driven pub/sub in
`data/feed.js`) but **never cleans it up**. When the ticker unmounts — pause the
feed, or navigate to Archive — the interval keeps firing and keeps calling
`setEvents` on an unmounted component (a classic leak). The active subscriber
count in `data/feed.js` never returns to `0`.

## Your task
Fix **only** `components/FeedTicker.jsx` so that:

1. The live ticker still streams new events while it is mounted.
2. When the ticker unmounts, the subscription stops and
   `subscriberCount()` returns to `0` (no leak, no setState-after-unmount).

## Constraints
- Edit **only** `components/FeedTicker.jsx`. The rest of the app is correct.
- **Do NOT remove or change any `data-testid`** — tests depend on them:
  `feed-ticker`, `feed-item`.

## How to run
```bash
npm test -- m09
```
Tests mount the **whole app** and drive it like a user. They FAIL first; make
them pass.

## Hint (peek only if stuck)
- `subscribe(...)` returns an `unsubscribe` function. Capture it and **return a
  cleanup function** from the effect that calls it:
  `const unsubscribe = subscribe(...); return () => unsubscribe();`
