# FocusTimer — Timer gets stuck at 1

**Time box:** ~10 min · **Difficulty:** core · **Topic:** stale closures, `setInterval`, functional state updates, `useEffect` cleanup

## The app
You've been handed **FocusTimer**, a small but complete Pomodoro / focus-timer app:

```
m02-stale-closure-interval/
├── App.jsx                    app root (layout + routes)
├── components/
│   ├── Navbar.jsx             top bar (brand + nav links)
│   ├── TimerPanel.jsx  👈     THE FILE YOU FIX
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx              timer + preset chips + recent sessions
│   └── History.jsx          second route (session log)
├── data/sessions.js         local dataset (offline)
└── styles.css
```

Run the pack (`npm run dev`) and open **m02** to see it live: a navbar with a
Timer / History nav, a focus-timer panel with a Start button, preset chips, and
a session history page. Everything works — **except one bug**.

## The bug
Press **Start**. The counter goes to `1` and then **stops**. It should keep
counting `1, 2, 3, …` once per second while running.

## Your task
Fix **only** `components/TimerPanel.jsx` so that:

1. Pressing **Start** makes the count advance by 1 every second (1, 2, 3, …).
2. Pressing **Stop** freezes the count where it is.

## Constraints
- Edit **only** `components/TimerPanel.jsx`. The rest of the app is correct.
- **Do NOT remove or change any `data-testid`** — the tests depend on them:
  `count`, `toggle`.
- Don't restructure the component; the fix is small. Keep cleaning up the
  interval on stop/unmount.

## How to run
```bash
npm test -- m02
```
Tests mount the **whole app** and drive it with fake timers. They FAIL first;
make them pass.

## Hints (peek only if stuck)
- The interval callback captured the initial `count` (a **stale closure**) at
  the moment the effect ran, so it forever computes `0 + 1`.
- Use the **functional updater** `setCount((c) => c + 1)` so the callback always
  sees the latest value. (An alternative is to keep the latest count in a ref
  that you update on every render.)
