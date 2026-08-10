import { useState } from "react";

const DEFAULT_STEPS = ["Account", "Profile", "Confirm"];

/**
 * MODULE m07 — Progress stepper. Read PROMPT.md.
 */
export default function Stepper({ steps = DEFAULT_STEPS }) {
  const [index, setIndex] = useState(0);

  // TODO: compute percent = index / (steps.length - 1) * 100.
  // TODO: next/back with clamping + disabled edges.

  return (
    <div>
      <h2>Stepper</h2>
      <p data-testid="current-label">{steps[index]}</p>
      <p data-testid="step-indicator">Step {index + 1} of {steps.length}</p>
      <div className="progress-track">
        <div data-testid="progress" className="progress-fill" style={{ width: "0%" }} />
      </div>
      <button data-testid="back">Back</button>
      <button data-testid="next">Next</button>
    </div>
  );
}
