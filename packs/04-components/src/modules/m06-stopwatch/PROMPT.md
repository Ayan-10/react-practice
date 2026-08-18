# m06 — GymTimer · Stopwatch (start / stop / reset)

**Time box:** ~15 min

You're given a complete **GymTimer** mini-app: a navbar, a workout timer (Home),
and a Workouts route — all working. The ONE thing to build is the stopwatch's
interval behaviour.

> 👉 The file to edit is **`components/Stopwatch.jsx`**. Everything else already
> works. The dev menu / tests mount the whole app.

The stopwatch counts elapsed **tenths of a second** using `setInterval`
(100ms tick). Start, Stop (pause), and Reset.

## Folder

```
m06-stopwatch/
  App.jsx                    app root (navbar + routes)
  index.jsx                  entry (re-exports App)
  components/
    Navbar.jsx  Footer.jsx
    Stopwatch.jsx            👈 BUILD THIS
  pages/    Home.jsx  Workouts.jsx
  data/workouts.js           local workouts list
  styles.css
```

## Requirements

- Display in `data-testid="elapsed"` as the number of ticks (integer, starts 0).
- `data-testid="start"` begins ticking (increment every 100ms).
- `data-testid="stop"` pauses (interval cleared, value preserved).
- `data-testid="reset"` sets the value back to 0 (and stops if running).
- Starting when already running must NOT create a second interval.

## Gotchas

- Keep the interval id in a `useRef` so you can clear it on stop/reset/unmount.
- Guard against double-start (only set an interval if none is running).
- Use the functional updater so the tick doesn't capture a stale count.

## Run

```
npx vitest run src/modules/m06-stopwatch/
```
