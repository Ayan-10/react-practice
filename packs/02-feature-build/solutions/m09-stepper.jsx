// SOLUTION — m09 CheckoutFlow wizard. Copy over components/CheckoutWizard.jsx to self-check.
import { useState } from "react";

export default function CheckoutWizard({ onSubmit = () => {} }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function next() {
    if (step === 1 && name.trim() === "") return setError("Name is required");
    if (step === 2 && !email.includes("@")) return setError("Valid email required");
    setError("");
    setStep((s) => Math.min(3, s + 1));
  }
  function back() {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  }
  function handleSubmit() {
    onSubmit({ name, email });
  }

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
