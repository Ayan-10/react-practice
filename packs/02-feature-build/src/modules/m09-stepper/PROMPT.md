# Feature: Multi-step Form (Stepper)

**Time box:** ~20 min · **Difficulty:** core · **Topic:** step state, per-step validation, review + submit

## Task
3-step wizard: name → email → review/submit. Next validates the current step;
Back goes back; final submit calls `onSubmit({ name, email })`.

## Rules
- Step 1 needs a non-empty name; step 2 needs an email containing `@`.
- Invalid Next: show `step-error`, stay on the step.
- Step 3 shows a review of the entered values.

## Required data-testids
`step-indicator`, `next-btn`, `back-btn`, `submit-btn`, `field-name`,
`field-email`, `step-error` (only on invalid), `review-name`, `review-email`.

## Run
```bash
npm test -- m09
```
