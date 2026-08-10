import { useRef, useState } from "react";

/**
 * MODULE m06 — Stopwatch. Read PROMPT.md.
 *
 * Count ticks (100ms each). start / stop / reset.
 */
export default function Stopwatch() {
  const [ticks, setTicks] = useState(0);
  const timer = useRef(null);

  // TODO: implement start (guard double-start), stop (clear), reset (0 + stop).

  return (
    <div>
      <h2>Stopwatch</h2>
      <p data-testid="elapsed">{ticks}</p>
      <button data-testid="start">Start</button>
      <button data-testid="stop">Stop</button>
      <button data-testid="reset">Reset</button>
    </div>
  );
}
