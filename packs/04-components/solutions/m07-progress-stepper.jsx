// SOLUTION — m07 Progress stepper.
import { useState } from "react";

const DEFAULT_STEPS = ["Account", "Profile", "Confirm"];

export default function Stepper({ steps = DEFAULT_STEPS }) {
  const [index, setIndex] = useState(0);
  const last = steps.length - 1;
  const percent = last === 0 ? 100 : (index / last) * 100;

  return (
    <div>
      <h2>Stepper</h2>
      <p data-testid="current-label">{steps[index]}</p>
      <p data-testid="step-indicator">Step {index + 1} of {steps.length}</p>
      <div className="progress-track">
        <div
          data-testid="progress"
          className="progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      <button
        data-testid="back"
        disabled={index === 0}
        onClick={() => setIndex((i) => Math.max(0, i - 1))}
      >
        Back
      </button>
      <button
        data-testid="next"
        disabled={index === last}
        onClick={() => setIndex((i) => Math.min(last, i + 1))}
      >
        Next
      </button>
    </div>
  );
}
