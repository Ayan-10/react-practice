import { useEffect, useState } from "react";

const INTERVAL = 1000;

/**
 * MODULE m10 — Polling. Read PROMPT.md.
 *
 * `load` resolves the latest value (a string/number).
 */
export default function Poller({ load }) {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);

  // TODO: fetch once on mount, then every INTERVAL ms.
  //       Update value + count on each result. Clear the interval on unmount.

  return (
    <div>
      <h2>Live value</h2>
      <p data-testid="value">{value}</p>
      <p data-testid="poll-count">{count}</p>
    </div>
  );
}
