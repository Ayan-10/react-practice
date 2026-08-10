import { useState } from "react";

/**
 * FEATURE MODULE m09 — Multi-step form (stepper).
 *
 * 3 steps: (1) name, (2) email, (3) review + submit.
 * Implement:
 *   - Next advances a step but ONLY if the current step is valid.
 *   - Back goes to the previous step.
 *   - Step 1 requires a non-empty name; step 2 requires an email containing "@".
 *   - On invalid Next, show step-error and stay on the step.
 *   - Step indicator shows "Step X of 3".
 *   - On final submit, call onSubmit({ name, email }).
 *
 * Required data-testids:
 *   - step-indicator, next-btn, back-btn, submit-btn
 *   - field-name, field-email
 *   - step-error (only when validation fails)
 *   - review-name, review-email (on step 3)
 */
export default function Stepper({ onSubmit = () => {} }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // TODO: next() validates the current step, then advances or sets step-error.
  // TODO: back() decrements.
  // TODO: handleSubmit() calls onSubmit({ name, email }).

  return (
    <div className="card" style={{ maxWidth: 420 }}>
      <p data-testid="step-indicator">Step {step} of 3</p>

      {step === 1 && (
        <input data-testid="field-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      )}
      {step === 2 && (
        <input data-testid="field-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      )}
      {step === 3 && (
        <div>
          <p>Name: <span data-testid="review-name">{name}</span></p>
          <p>Email: <span data-testid="review-email">{email}</span></p>
        </div>
      )}

      {/* TODO: render step-error when invalid */}

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {step > 1 && <button data-testid="back-btn" /* onClick={back} */>Back</button>}
        {step < 3 && <button className="btn" data-testid="next-btn" /* onClick={next} */>Next</button>}
        {step === 3 && <button className="btn" data-testid="submit-btn" /* onClick={handleSubmit} */>Submit</button>}
      </div>
    </div>
  );
}
