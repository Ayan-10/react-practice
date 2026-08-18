# TravelWallet — Build the live currency converter

**Time box:** ~25 min · **Difficulty:** core · **Topic:** async fetch, dependent effect, derived value

## The app
You've been handed **TravelWallet**, a small but complete money-conversion app:

```
m02-currency-converter/
├── App.jsx                        app root (layout + routes)
├── components/
│   ├── Navbar.jsx                 top bar (brand + nav links)
│   ├── CurrencyConverter.jsx  👈    THE FILE YOU BUILD
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx                  converter page (renders CurrencyConverter)
│   └── Rates.jsx                 second route (supported currencies)
├── data/currencies.js           supported currency list (offline)
└── styles.css
```

Run the pack (`npm run dev`) and open **m02** to see it live: a navbar, an
amount input with from/to dropdowns, and a Rates page. Everything works —
**except the conversion never happens**. Today the result is stuck at `0.00`
no matter what you type or select.

## Your task
Build **only** `components/CurrencyConverter.jsx` so the amount converts live.

1. Fetch the exchange rate with `fetchRate(from, to)` (imported from
   `../../../shared/api.js`) **whenever `from` or `to` changes**.
2. `result` = `amount * rate`, shown to **2 decimals** in `data-testid="result"`.
3. Recompute the result whenever `amount`, `from`, or `to` changes.
4. Render `data-testid="loading"` while a rate is being fetched.

`fetchRate(from, to)` returns a `Promise<number>` (Frankfurter API under the
hood, with a 1:1 offline fallback). In tests it is mocked with deterministic
rates, e.g. `USD→EUR = 0.9`, `USD→INR = 83`.

## Required data-testids (mandatory for grading)
- Amount input: `amount`
- From dropdown: `from`
- To dropdown: `to`
- Converted result (2 decimals): `result`
- Loading indicator (while fetching): `loading`

## How to run
```bash
npm test -- m02
```
Tests mount the **whole app** (navbar + converter + rates route) and drive it
like a user. The app renders on the stub; the feature tests FAIL first — make
them pass.

## Hints (peek only if stuck)
- `useEffect(() => { fetchRate(from, to).then(setRate); }, [from, to])`.
- Keep `rate` in state; compute `converted = amount * rate` during render, then
  print `converted.toFixed(2)`.
- Flip a `loading` flag `true` before the fetch and `false` in `.then(...)`;
  render `<p data-testid="loading">…</p>` only while it is `true`.
- Guard against stale responses when currencies change fast (use an `active`
  flag in the effect cleanup) — not required to pass, but good practice.
