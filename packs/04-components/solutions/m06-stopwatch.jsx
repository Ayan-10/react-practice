// SOLUTION — m06 Stopwatch.
import { useEffect, useRef, useState } from "react";

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

  useEffect(() => stop, []); // clear on unmount

  return (
    <div>
      <h2>Stopwatch</h2>
      <p data-testid="elapsed">{ticks}</p>
      <button data-testid="start" onClick={start}>Start</button>
      <button data-testid="stop" onClick={stop}>Stop</button>
      <button data-testid="reset" onClick={reset}>Reset</button>
    </div>
  );
}
