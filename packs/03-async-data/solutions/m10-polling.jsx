// SOLUTION — m10 StatusMonitor interval polling with cleanup.
// Copy this over components/Poller.jsx to self-check.
import { useEffect, useState } from "react";
import { loadStatus } from "../data/status.js";

const INTERVAL = 1000;

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
