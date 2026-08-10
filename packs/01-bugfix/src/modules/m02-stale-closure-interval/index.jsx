import { useState, useEffect } from "react";

/**
 * BUGFIX MODULE m02 — Stale closure in setInterval.
 *
 * The counter is supposed to increment by 1 every second once started.
 * Bug: it jumps to 1 and then stops advancing, because the interval closes over
 * the initial `count` value (a stale closure) and always computes `0 + 1`.
 *
 * Fix the auto-increment so it keeps counting up: 1, 2, 3, ...
 * Do not change the data-testid values.
 */
export default function StaleClosureInterval() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    // BUG: this reads `count` from the closure at the time the effect ran.
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return (
    <div className="card">
      <h2>Auto Counter</h2>
      <p data-testid="count" style={{ fontSize: 32, fontWeight: 700 }}>{count}</p>
      <button className="btn" data-testid="toggle" onClick={() => setRunning((r) => !r)}>
        {running ? "Stop" : "Start"}
      </button>
    </div>
  );
}
