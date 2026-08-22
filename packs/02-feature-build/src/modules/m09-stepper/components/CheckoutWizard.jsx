import { useState } from "react";

/**
 * FEATURE TO BUILD — the multi-step checkout wizard.
 *
 * 3 steps: (1) Shipping name, (2) Payment email, (3) Review + place order.
 * Implement:
 *   - next() advances a step but ONLY if the current step is valid.
 *     • step 1 requires a non-empty name
 *     • step 2 requires an email containing "@"
 *     • on invalid Next, show <p data-testid="step-error"> and STAY on the step.
 *   - back() goes to the previous step and clears any error.
 *   - handleSubmit() calls onSubmit({ name, email }) on the final step.
 *   - The step indicator shows "Step X of 3".
 *
 * Required data-testids (keep them all):
 *   step-indicator, next-btn, back-btn, submit-btn,
 *   field-name, field-email, review-name, review-email,
 *   step-error (only when validation fails)
 */
export default function CheckoutWizard({ onSubmit = () => {} }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // TODO: implement next() (validate the current step — non-empty name on
  // step 1, email containing "@" on step 2 — setError and stay on invalid,
  // otherwise clear the error and advance), back() (go to the previous step,
  // clear any error), and handleSubmit() (call onSubmit({ name, email })).
  function next() {}

  function back() {}

  function handleSubmit() {}

  return (
    <div className="cf-wizard">
      <p className="cf-step-indicator" data-testid="step-indicator">
        Step {step} of 3
      </p>

      {step === 1 && (
        <label className="cf-label">
          Full name
          <input
            className="cf-input"
            data-testid="field-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
          />
        </label>
      )}

      {step === 2 && (
        <label className="cf-label">
          Email
          <input
            className="cf-input"
            data-testid="field-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
          />
        </label>
      )}

      {step === 3 && (
        <div className="cf-review">
          <p>
            Name: <span data-testid="review-name">{name}</span>
          </p>
          <p>
            Email: <span data-testid="review-email">{email}</span>
          </p>
        </div>
      )}

      {error && (
        <p className="cf-error" data-testid="step-error">
          {error}
        </p>
      )}

      <div className="cf-wizard-actions">
        {step > 1 && (
          <button className="cf-btn cf-btn-ghost" data-testid="back-btn" onClick={back}>
            Back
          </button>
        )}
        {step < 3 && (
          <button className="cf-btn" data-testid="next-btn" onClick={next}>
            Next
          </button>
        )}
        {step === 3 && (
          <button className="cf-btn" data-testid="submit-btn" onClick={handleSubmit}>
            Place order
          </button>
        )}
      </div>
    </div>
  );
}
