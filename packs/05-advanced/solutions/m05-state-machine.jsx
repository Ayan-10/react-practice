// SOLUTION — m05 CrossWalk traffic light finite state machine.
// Copy this over components/TrafficLight.jsx to self-check.
import { useState } from "react";
import { ORDER, LABELS, WALK_STATE } from "../data/states.js";

export const TRANSITIONS = {
  green: "yellow",
  yellow: "red",
  red: "green",
};

export { ORDER, LABELS };

export function nextState(current) {
  return TRANSITIONS[current] ?? current;
}

export default function TrafficLight() {
  const [state, setState] = useState(ORDER[0]);
  const walking = state === WALK_STATE;

  return (
    <div className="sm-light-wrap">
      <div
        className={`sm-light sm-light-${state}`}
        data-testid="light"
        data-state={state}
      >
        <span className="sm-light-name">{state}</span>
        <span className="sm-light-label">{LABELS[state]}</span>
      </div>

      <div className="sm-controls">
        <button
          className="btn"
          data-testid="next-btn"
          onClick={() => setState((s) => nextState(s))}
        >
          Next
        </button>
        <span
          className={`sm-walk ${walking ? "sm-walk-go" : "sm-walk-stop"}`}
          data-testid="walk"
        >
          {walking ? "Walk" : "Don't Walk"}
        </span>
      </div>
    </div>
  );
}
