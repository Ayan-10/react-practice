// SOLUTION — m10 Polling.
import { useEffect, useState } from "react";

const INTERVAL = 1000;

export default function Poller({ load }) {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let active = true;

    const tick = () => {
      load().then((v) => {
        if (!active) return;
        setValue(v);
        setCount((c) => c + 1);
      });
    };

    tick(); // fetch immediately on mount
    const id = setInterval(tick, INTERVAL);

    return () => {
      active = false;
      clearInterval(id);
    };
  }, [load]);

  return (
    <div>
      <h2>Live value</h2>
      <p data-testid="value">{value}</p>
      <p data-testid="poll-count">{count}</p>
    </div>
  );
}
