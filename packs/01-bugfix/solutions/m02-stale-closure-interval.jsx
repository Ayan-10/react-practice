// SOLUTION — m02. Use the functional updater so no stale closure.
import { useState, useEffect } from "react";

export default function StaleClosureInterval() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setCount((c) => c + 1); // functional update — always latest value
    }, 1000);
    return () => clearInterval(id);
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
