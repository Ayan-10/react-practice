// SOLUTION — m03 PrimeLab memoization (useMemo / useCallback / React.memo).
// Copy this over components/PrimeList.jsx to self-check.
import { useState, useRef, useMemo, useCallback, memo } from "react";

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

  // useMemo keyed on n: the expensive fn only re-runs when n changes, NOT when
  // the unrelated `count` bumps. Increment the counter inside the factory so
  // tests can prove exactly how often it ran.
  const primeCount = useMemo(() => {
    computeRef.current++;
    return countPrimes(n);
  }, [n]);

  // useCallback: stable identity so React.memo can skip re-rendering <Row>
  // when an unrelated re-render (a count bump) happens.
  const onPick = useCallback((label) => setPicked(label), []);

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
