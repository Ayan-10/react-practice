// Local dataset for the CrossWalk mini-app. Works fully offline.
// The traffic-light finite state machine cycles through these states.

// Canonical order of the light's states.
export const ORDER = ["green", "yellow", "red"];

// Human-friendly labels + the pedestrian instruction per state.
export const LABELS = {
  green: "Go",
  yellow: "Slow down",
  red: "Stop",
};

// Pedestrians may cross only when vehicles are stopped (state === "red").
export const WALK_STATE = "red";
