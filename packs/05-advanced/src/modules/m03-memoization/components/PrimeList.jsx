import { useState, useRef, memo } from "react";

/**
 * THE FEATURE TO BUILD — m03 PrimeLab memoization demo.
 *
 * Goal: prove you understand useMemo + useCallback + React.memo by making an
 * expensive computation and a memoized child NOT re-run when an *unrelated*
 * piece of state (`count`) changes.
 *
 * There are two independent pieces of state:
 *   - `n`      → the number we count primes up to (changing it SHOULD recompute)
 *   - `count`  → an unrelated counter bumped by a button (should NOT recompute)
 *
 * `countPrimes(n)` is deliberately slow. It must be wrapped in `useMemo` keyed
 * on `n` so it only re-runs when `n` changes — NOT on every render (e.g. when
 * `count` bumps). Increment the `computeRef` counter INSIDE the memo factory so
 * tests can see exactly how many times the expensive fn actually ran.
 *
 * The memoized `<Row>` child (already wrapped in React.memo below) receives an
 * `onPick` callback. Wrap that callback in `useCallback` so its identity is
 * stable and the child does not re-render when `count` bumps.
 *
 * REQUIRED data-testids:
 *   - n-input        (number input to change N)
 *   - prime-count    (the memoized prime count for the current N)
 *   - compute-count  (how many times countPrimes actually ran — from computeRef)
 *   - bump-btn       (increments the unrelated `count`)
 *   - count-val      (shows the unrelated `count`)
 *
 * ── THE BUG (fix it) ──────────────────────────────────────────────────────
 * The stub below calls countPrimes(n) directly during render, so it recomputes
 * on EVERY render — including when you bump the unrelated count. Wrap it in
 * useMemo (keyed on n) so bumping `count` no longer recomputes, and wrap
 * `onPick` in useCallback so <Row> stops re-rendering on unrelated bumps.
 */

// Deliberately not the fastest prime counter — that's the point.
export function countPrimes(n) {
  let total = 0;
  for (let i = 2; i <= n; i++) {
    let isPrime = true;
    for (let d = 2; d * d <= i; d++) {
      if (i % d === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) total++;
  }
  return total;
}

const Row = memo(function Row({ label, onPick }) {
  return (
    <button className="btn secondary ml-row" onClick={() => onPick(label)}>
      Pick: {label}
    </button>
  );
});

export default function PrimeList() {
  const [n, setN] = useState(1000);
  const [count, setCount] = useState(0);
  const [picked, setPicked] = useState(null);
  const computeRef = useRef(0);

  // TODO: wrap this in useMemo(() => { computeRef.current++; return countPrimes(n); }, [n])
  // so it does NOT recompute when the unrelated `count` state changes.
  computeRef.current++;
  const primeCount = countPrimes(n);

  // TODO: wrap this in useCallback so <Row>'s props stay stable across
  // unrelated re-renders (so React.memo can skip re-rendering it).
  const onPick = (label) => setPicked(label);

  return (
    <div className="ml-lab card">
      <div className="ml-field">
        <label htmlFor="ml-n">Count primes up to N:</label>
        <input
          id="ml-n"
          type="number"
          className="ml-input"
          data-testid="n-input"
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
        />
      </div>

      <div className="ml-stats">
        <div className="ml-stat">
          <span className="ml-stat-label">Primes ≤ N</span>
          <strong data-testid="prime-count">{primeCount}</strong>
        </div>
        <div className="ml-stat">
          <span className="ml-stat-label">Compute runs</span>
          <strong data-testid="compute-count">{computeRef.current}</strong>
        </div>
        <div className="ml-stat">
          <span className="ml-stat-label">Unrelated count</span>
          <strong data-testid="count-val">{count}</strong>
        </div>
      </div>

      <div className="ml-actions">
        <button
          className="btn"
          data-testid="bump-btn"
          onClick={() => setCount((c) => c + 1)}
        >
          Bump unrelated count
        </button>
        <Row label="A" onPick={onPick} />
        <Row label="B" onPick={onPick} />
      </div>

      <p className="ml-picked">Last picked: {picked ?? "—"}</p>
    </div>
  );
}
