// SOLUTION — m02 FocusTimer TimerPanel auto-increment.
// This is the FIXED version of components/TimerPanel.jsx. Attempt it yourself
// first, then compare. To self-check: copy this over components/TimerPanel.jsx.
//
// Fix: use the functional updater so the interval never reads a stale `count`.
import { useState, useEffect } from "react";

export default function TimerPanel() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setCount((c) => c + 1); // functional update — always the latest value
    }, 1000);
    return () => clearInterval(id);
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
