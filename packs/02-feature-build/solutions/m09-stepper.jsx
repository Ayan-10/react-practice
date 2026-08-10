// SOLUTION — m09 Stepper.
import { useState } from "react";

export default function Stepper({ onSubmit = () => {} }) {
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

      {error && <p data-testid="step-error" style={{ color: "crimson" }}>{error}</p>}

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {step > 1 && <button data-testid="back-btn" onClick={back}>Back</button>}
        {step < 3 && <button className="btn" data-testid="next-btn" onClick={next}>Next</button>}
        {step === 3 && <button className="btn" data-testid="submit-btn" onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
}
