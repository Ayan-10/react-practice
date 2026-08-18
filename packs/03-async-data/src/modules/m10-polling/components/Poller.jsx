import { useEffect, useState } from "react";
import { loadStatus } from "../data/status.js";

const INTERVAL = 1000;

/**
 * THE FEATURE TO BUILD — m10 StatusMonitor polling.
 *
 * `load` resolves the latest value (a string/number). It is injected as a prop
 * so tests can drive it deterministically (with fake timers), and defaults to
 * the local offline loader so the mini-app renders real data.
 *
 * Behaviour:
 *   - Fetch once on mount, then every INTERVAL (1000ms).
 *   - Show the latest value and how many values have been received.
 *   - On unmount, clearInterval so no further fetches occur (alive flag guards
 *     late resolutions).
 *
 * REQUIRED data-testids: value, poll-count.
 */
export default function Poller({ load = loadStatus }) {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let alive = true;

    async function poll() {
      const next = await load();
      if (!alive) return;
      setValue(next);
      setCount((c) => c + 1);
    }

    poll();
    const id = setInterval(poll, INTERVAL);

    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [load]);

  return (
    <div className="sm-monitor">
      <h2 className="sm-feature-title">Live status</h2>
      <p className="sm-value" data-testid="value">
        {value}
      </p>
      <p className="sm-count">
        polls received: <span data-testid="poll-count">{count}</span>
      </p>
    </div>
  );
}
