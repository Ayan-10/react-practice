# m10 — Polling (auto-refresh)

**Time box:** ~12 min

Show a live value that refreshes on an interval. Poll `load()` every
`INTERVAL = 1000ms` and display the latest value. The polling must **stop** when
the component unmounts (no leaked interval).

## Requirements

- Fetch once on mount, then every 1000ms.
- Display the latest value in `data-testid="value"`.
- A `data-testid="poll-count"` shows how many times a value has been received.
- On unmount, `clearInterval` so no further fetches occur.

## Gotchas

- Return a cleanup from the effect that clears the interval.
- Use the functional updater for the count so you don't capture a stale value in
  the interval closure.
- Empty dependency array (set the interval up once).
