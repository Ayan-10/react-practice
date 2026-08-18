// SOLUTION — m07 OnboardWizard progress stepper (components/Stepper.jsx).
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
  const percent = lastIndex === 0 ? 100 : (index / lastIndex) * 100;

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
        <button
          className="ow-btn"
          data-testid="back"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          Back
        </button>
        <button
          className="ow-btn"
          data-testid="next"
          disabled={index === lastIndex}
          onClick={() => setIndex((i) => Math.min(lastIndex, i + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
