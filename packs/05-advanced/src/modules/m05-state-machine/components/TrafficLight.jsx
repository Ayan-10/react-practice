import { useState } from "react";
import { ORDER, LABELS, WALK_STATE } from "../data/states.js";

/**
 * THE FEATURE TO BUILD — m05 CrossWalk traffic light, a finite state machine.
 *
 * The light cycles: green → yellow → red → green (and repeats).
 *
 * Implement a PURE transition function and its transition map:
 *   - TRANSITIONS: a map from each state to its next state, e.g.
 *       { green: "yellow", yellow: "red", red: "green" }
 *   - nextState(current): returns the next state per TRANSITIONS (pure; no UI).
 *
 * The JSX below is already wired to `nextState` via the "next-btn". Once
 * nextState actually advances, the UI and the walk indicator follow.
 *
 * REQUIRED data-testids:
 *   - light        → element whose text + data-state reflect the current state
 *                    ("green" / "yellow" / "red")
 *   - next-btn     → advances the light via the state machine
 *   - walk         → shows "Walk" only when state === "red" (pedestrians cross),
 *                    otherwise "Don't Walk"
 *
 * Rendering rules:
 *   - <element data-testid="light" data-state={state}> shows the state name.
 *   - <element data-testid="walk"> shows "Walk" at red, else "Don't Walk".
 */

// A map from each state to the state that follows it.
export const TRANSITIONS = {
  green: "yellow",
  yellow: "red",
  red: "green",
};

// Re-exported so tests / UI can rely on canonical order + labels.
export { ORDER, LABELS };

export function nextState(current) {
  // TODO: implement — return the state that follows `current` per TRANSITIONS.
  return current;
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
