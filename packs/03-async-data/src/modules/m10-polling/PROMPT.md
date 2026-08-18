# m10 — StatusMonitor · Polling (auto-refresh)

**Time box:** ~12 min

You're given a complete **StatusMonitor** mini-app: a navbar, a live status
value (Home), and a History route — all working. The ONE thing to build is the
interval polling.

> 👉 The file to edit is **`components/Poller.jsx`**. Everything else already
> works. The dev menu / tests mount the whole app.

Show a live value that refreshes on an interval. Poll `load()` every
`INTERVAL = 1000ms` and display the latest value. The polling must **stop** when
the component unmounts (no leaked interval).

## Folder

```
m10-polling/
  App.jsx                    app root (navbar + routes)
  index.jsx                  entry (re-exports App)
  components/
    Navbar.jsx  Footer.jsx  StatusCard.jsx
    Poller.jsx               👈 BUILD THIS
  pages/    Home.jsx  History.jsx
  data/status.js             local statuses + default loadStatus()
  styles.css
```

## Requirements

- Fetch once on mount, then every 1000ms.
- Display the latest value in `data-testid="value"`.
- A `data-testid="poll-count"` shows how many times a value has been received.
- On unmount, `clearInterval` so no further fetches occur.
- `load` is a prop (tests inject a mock) and defaults to the local `loadStatus`.

## Gotchas

- Return a cleanup from the effect that clears the interval.
- Use the functional updater for the count so you don't capture a stale value in
  the interval closure.
- Guard late resolutions with an `alive` flag so an in-flight `load()` can't set
  state after unmount.

## Run

```
npx vitest run src/modules/m10-polling/
```
