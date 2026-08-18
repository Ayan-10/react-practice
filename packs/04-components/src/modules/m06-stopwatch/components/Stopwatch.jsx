import { useRef, useState } from "react";

/**
 * THE FEATURE TO BUILD — m06 GymTimer stopwatch.
 *
 * Count ticks (100ms each) with a useRef-held interval. start / stop / reset.
 *   - start(): begin ticking; guard against double-start so two clicks don't
 *     create two intervals (which would double-count).
 *   - stop(): pause, preserving the current value.
 *   - reset(): stop and return to 0.
 *
 * REQUIRED data-testids: elapsed, start, stop, reset.
 */
export default function Stopwatch() {
  const [ticks, setTicks] = useState(0);
  const timer = useRef(null);

  function start() {
    if (timer.current !== null) return; // guard double-start
    timer.current = setInterval(() => {
      setTicks((t) => t + 1);
    }, 100);
  }

  function stop() {
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }

  function reset() {
    stop();
    setTicks(0);
  }

  return (
    <div className="gt-stopwatch">
      <p className="gt-elapsed" data-testid="elapsed">
        {ticks}
      </p>
      <div className="gt-controls">
        <button className="gt-btn gt-start" data-testid="start" onClick={start}>
          Start
        </button>
        <button className="gt-btn gt-stop" data-testid="stop" onClick={stop}>
          Stop
        </button>
        <button className="gt-btn gt-reset" data-testid="reset" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
