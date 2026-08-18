# m07 — CryptoTicker · Retry on failure

**Time box:** ~12 min

You're given a complete **CryptoTicker** mini-app: a navbar, a live market grid
(Home), and a Watchlist route — all working. The ONE thing to build is the
retry-on-error fetch.

> 👉 The file to edit is **`components/RetryList.jsx`**. Everything else already
> works. The dev menu / tests mount the whole app.

When a fetch fails, show an error with a **Retry** button that re-runs the same
request. A retry that succeeds must clear the error and show the data.

## Folder

```
m07-retry/
  App.jsx                    app root (navbar + routes)
  index.jsx                  entry (re-exports App)
  components/
    Navbar.jsx  Footer.jsx  CoinCard.jsx
    RetryList.jsx            👈 BUILD THIS
  pages/    Home.jsx  Watchlist.jsx
  data/coins.js              local coins + default loadCoins()
  styles.css
```

## Requirements

- On mount, call `load()` (resolves `{ products, total }` or rejects).
- While in flight: `data-testid="loading"`.
- On failure: `data-testid="error"` (text `Failed`) plus `data-testid="retry"` button.
- Clicking retry re-calls `load()` and goes back through loading → data/error.
- On success: render items as `data-testid="product-item"` inside `data-testid="product-list"`.
- `load` is a prop (tests inject a mock) and defaults to the local `loadCoins`.

## Gotchas

- Reuse one `fetchData` function for both the mount effect and the retry click.
- Reset the error before each attempt so a successful retry clears the old error.

## Run

```
npx vitest run src/modules/m07-retry/
```
