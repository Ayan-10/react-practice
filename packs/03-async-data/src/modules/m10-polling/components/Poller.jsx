import { useState } from "react";
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

  // TODO: fetch once on mount, then every INTERVAL ms via setInterval. Update
  // `value` and increment `count` on each successful fetch. Clean up the
  // interval (and guard late resolutions with an `alive` flag) on unmount.

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
