# m03 — PrimeLab · Memoization (useMemo / useCallback / React.memo)

**Time box:** ~25 min

You're given a complete **PrimeLab** mini-app: a navbar, a Lab page (count
primes up to N + an unrelated counter), and an About route — all working. The
feature works but has a **performance bug**: the expensive prime count re-runs
on *every* render, including when an unrelated counter is bumped.

> 👉 The file to edit is **`components/PrimeList.jsx`**. Fix the bug using
> `useMemo`, `useCallback`, and `React.memo`.

## The two pieces of state

- `n` — the number we count primes up to. Changing it **should** recompute.
- `count` — an unrelated counter (the "Bump" button). Changing it should **NOT**
  recompute the prime count or re-render the memoized `<Row>` children.

## Requirements

1. Wrap `countPrimes(n)` in **`useMemo`** keyed on `[n]`, incrementing
   `computeRef.current` **inside** the memo factory. Result: bumping `count` no
   longer re-runs the expensive function.
2. Wrap the `onPick` handler in **`useCallback`** so its identity is stable and
   the `React.memo`-wrapped `<Row>` children don't re-render on unrelated bumps.

The component renders these `data-testid`s:
`n-input`, `prime-count`, `compute-count`, `bump-btn`, `count-val`.

## Gotchas

- The counter you increment for `compute-count` must live in a `useRef` and be
  bumped **inside** the `useMemo` factory — not during plain render.
- `useMemo`/`useCallback` deps arrays matter: `[n]` for the compute, `[]` (or a
  stable setter) for `onPick`.
- Export `countPrimes` (the test unit-tests it directly).

## Run

```
npx vitest run src/modules/m03-memoization/
```
