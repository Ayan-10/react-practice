import { useState } from "react";

const DEFAULT_STEPS = ["Account", "Profile", "Confirm"];

/**
 * THE FEATURE TO BUILD — m07 OnboardWizard progress stepper.
 *
 * Track the current step index; render a label, a "Step X of N" indicator, and
 * a progress fill whose width is index / (lastIndex) * 100%. Back/Next move the
 * index and are disabled at the ends.
 *
 * REQUIRED data-testids: current-label, step-indicator, progress, back, next.
 */
export default function Stepper({ steps = DEFAULT_STEPS }) {
  const [index, setIndex] = useState(0);

  const lastIndex = steps.length - 1;
  // TODO: compute `percent` as index / lastIndex * 100 (100 when there's
  // only one step).
  const percent = 0;

  return (
    <div className="ow-stepper">
      <p className="ow-current-label" data-testid="current-label">
        {steps[index]}
      </p>
      <p className="ow-step-indicator" data-testid="step-indicator">
        Step {index + 1} of {steps.length}
      </p>
      <div className="ow-progress-track">
        <div
          data-testid="progress"
          className="ow-progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="ow-controls">
        {/* TODO: Back should decrement `index` (clamped to 0) and be
            disabled at index 0. Next should increment `index` (clamped to
            lastIndex) and be disabled at lastIndex. */}
        <button className="ow-btn" data-testid="back" disabled={index === 0}>
          Back
        </button>
        <button
          className="ow-btn"
          data-testid="next"
          disabled={index === lastIndex}
        >
          Next
        </button>
      </div>
    </div>
  );
}
