# Feature: Currency Converter

**Time box:** ~25 min · **Difficulty:** core · **Topic:** async fetch, dependent effect, derived value

## Task (PayPal-style)
Build a converter with an amount input and from/to currency dropdowns. The
converted amount updates live whenever amount, from, or to changes. Use
`fetchRate(from, to)` (Frankfurter API under the hood, mocked in tests).

## Requirements
- Fetch the rate when `from` or `to` changes.
- `result` = `amount * rate`, shown to **2 decimals** in `data-testid="result"`.
- Show `data-testid="loading"` while a rate is being fetched.

## Required data-testids
`amount`, `from`, `to`, `result` (and `loading` while fetching).

## Run
```bash
npm test -- m02
```

## Hints
- `useEffect(() => { fetchRate(from,to).then(setRate) }, [from, to])`.
- Guard against stale responses (see the async pack) — not required to pass but good.
