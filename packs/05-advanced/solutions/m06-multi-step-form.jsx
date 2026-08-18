// SOLUTION — m06 ApplyFlow wizard: validation + async submit.
// Copy this over components/Wizard.jsx to self-check.
import { useState } from "react";
import { TOTAL_STEPS } from "../data/steps.js";

const defaultSubmit = async () => {
  return { ok: true };
};

export function validateStep(step, form) {
  const errors = {};
  if (step === 1) {
    if (!form.name || !form.name.trim()) errors.name = "Name is required.";
  }
  if (step === 2) {
    if (!form.email || !form.email.includes("@"))
      errors.email = "Enter a valid email (must include @).";
    else if (form.confirm !== form.email)
      errors.confirm = "Emails do not match.";
  }
  return errors;
}

export default function Wizard({ onSubmit = defaultSubmit }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  function handleNext() {
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function handleBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setStatus(null);
    try {
      await onSubmit(form);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="af-wizard card">
      <p className="af-step-indicator" data-testid="step-indicator">
        Step {step} of {TOTAL_STEPS}
      </p>

      {status === "success" ? (
        <p className="af-success" data-testid="success">
          Application submitted — thank you!
        </p>
      ) : (
        <div className="af-form">
          {step === 1 && (
            <label className="af-field">
              <span>Full name</span>
              <input
                data-testid="input-name"
                value={form.name}
                onChange={set("name")}
              />
              {errors.name && (
                <span className="af-error" data-testid="error-name">
                  {errors.name}
                </span>
              )}
            </label>
          )}

          {step === 2 && (
            <>
              <label className="af-field">
                <span>Email</span>
                <input
                  data-testid="input-email"
                  value={form.email}
                  onChange={set("email")}
                />
                {errors.email && (
                  <span className="af-error" data-testid="error-email">
                    {errors.email}
                  </span>
                )}
              </label>
              <label className="af-field">
                <span>Confirm email</span>
                <input
                  data-testid="input-confirm"
                  value={form.confirm}
                  onChange={set("confirm")}
                />
                {errors.confirm && (
                  <span className="af-error" data-testid="error-confirm">
                    {errors.confirm}
                  </span>
                )}
              </label>
            </>
          )}

          {step === 3 && (
            <div className="af-review">
              <p>
                <strong>Name:</strong> {form.name}
              </p>
              <p>
                <strong>Email:</strong> {form.email}
              </p>
              {status === "error" && (
                <p className="af-error" data-testid="submit-error">
                  Something went wrong — please try again.
                </p>
              )}
            </div>
          )}

          <div className="af-actions">
            {step > 1 && (
              <button
                type="button"
                className="btn secondary"
                data-testid="back-btn"
                onClick={handleBack}
              >
                Back
              </button>
            )}
            {step < TOTAL_STEPS && (
              <button
                type="button"
                className="btn"
                data-testid="next-btn"
                onClick={handleNext}
              >
                Next
              </button>
            )}
            {step === TOTAL_STEPS && (
              <button
                type="button"
                className="btn"
                data-testid="submit-btn"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting…" : "Submit"}
              </button>
            )}
          </div>

          {submitting && (
            <p className="af-submitting" data-testid="submitting">
              Submitting…
            </p>
          )}
        </div>
      )}
    </div>
  );
}
