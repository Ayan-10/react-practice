import { useState } from "react";
import { TOTAL_STEPS } from "../data/steps.js";

/**
 * THE FEATURE TO BUILD — m06 ApplyFlow wizard: a 3-step form with per-step and
 * cross-field validation plus an async submit.
 *
 * Steps:
 *   1. name          — required (non-empty).
 *   2. email         — must include "@"; confirmEmail must EQUAL email
 *                      (CROSS-FIELD validation).
 *   3. review        — shows the entered values + a Submit button.
 *
 * Wiring already done for you: inputs are controlled, Back/Next/Submit call the
 * handlers below. You must implement:
 *
 *   - validateStep(step, form): return an { field: message } object of errors
 *       for the GIVEN step. Empty object means the step is valid.
 *         step 1 → { name } if empty
 *         step 2 → { email } if no "@"; { confirm } if confirm !== email
 *   - handleNext: validate the current step; if there are errors, STORE them
 *       (so error-<field> renders) and DO NOT advance. If valid, clear errors
 *       and advance.
 *   - handleSubmit: set a "submitting" state, await onSubmit(form). On resolve
 *       show `success`; on reject show `submit-error`.
 *
 * REQUIRED data-testids:
 *   - step-indicator  → "Step 1 of 3" etc.
 *   - input-name, input-email, input-confirm
 *   - next-btn, back-btn, submit-btn
 *   - error-name, error-email, error-confirm (only when that field is invalid)
 *   - submitting (while the async submit is pending)
 *   - success       (after onSubmit resolves)
 *   - submit-error  (after onSubmit rejects)
 *
 * `onSubmit` is a PROP defaulting to a local async fn that resolves; tests inject
 * a mock.
 */

const defaultSubmit = async () => {
  return { ok: true };
};

export function validateStep(step, form) {
  // TODO: implement per-step + cross-field validation.
  // Return an object of { field: message }. Empty object = valid.
  return {};
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
    // TODO: validate current step; block + show errors when invalid, else advance.
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function handleBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit() {
    // TODO: set submitting, await onSubmit(form), then show success / submit-error.
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
