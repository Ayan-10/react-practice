# m06 — Stopwatch

**Time box:** ~15 min

Build a stopwatch that counts elapsed **tenths of a second** using `setInterval`
(100ms tick). Start, Stop (pause), and Reset.

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
