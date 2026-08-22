import { useState, useEffect } from "react";

/**
 * 🐞 THIS IS THE FILE YOU NEED TO FIX.
 *
 * The focus timer lives on the Home page. Press Start and the counter is
 * supposed to tick up once per second: 1, 2, 3, …
 * BUG: it jumps to 1 and then stops advancing. The interval closes over the
 * initial `count` value (a stale closure), so it always computes `0 + 1`.
 *
 * Everything else in this project already works — only edit this component.
 *
 * DO NOT change or remove any existing data-testid attributes:
 *   count, toggle
 */
export default function TimerPanel() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    // 🐞 BUG: this interval reads `count` from the closure captured the moment
    //         the effect ran (when you pressed Start). Because `count` was 0
    //         then, it forever computes `0 + 1` and gets stuck at 1.
    //
    // TODO (fix): use the FUNCTIONAL updater `setCount((c) => c + 1)` so the
    //             callback always sees the latest value — no stale closure.
    //             (An alternative is to keep the latest count in a ref.)
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const mm = String(Math.floor(count / 60)).padStart(2, "0");
  const ss = String(count % 60).padStart(2, "0");

  return (
    <div className="ft-timer" data-testid="timer-panel">
      <p className="ft-timer-label">Elapsed</p>
      <p className="ft-clock">{mm}:{ss}</p>
      <p data-testid="count" className="ft-count">{count}</p>
      <button
        className="ft-btn"
        data-testid="toggle"
        onClick={() => setRunning((r) => !r)}
      >
        {running ? "Stop" : "Start"}
      </button>
    </div>
  );
}
