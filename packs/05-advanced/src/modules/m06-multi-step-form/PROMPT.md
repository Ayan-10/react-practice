# m06 — ApplyFlow · Multi-step form (validation + async submit)

**Time box:** ~30 min

You're given a complete **ApplyFlow** mini-app: a navbar, a Home page with a
3-step wizard, and an FAQ route — all working. The ONE thing to build is the
wizard's **validation and submit logic**.

> 👉 The file to edit is **`components/Wizard.jsx`**. Inputs, buttons and the
> step layout are wired; you implement `validateStep`, `handleNext` and
> `handleSubmit`.

## Requirements

Three steps, `form = { name, email, confirm }`:

- **Step 1** — `name` required (non-empty).
- **Step 2** — `email` must include `"@"`; `confirm` must EQUAL `email`
  (**cross-field** validation).
- **Step 3** — review + submit.

Behaviour:

- `validateStep(step, form)` returns an `{ field: message }` object of errors for
  that step (empty object = valid).
- **Next** validates the current step. If invalid, render `error-<field>` and do
  NOT advance. If valid, clear errors and advance.
- **Back** decrements the step and clears errors.
- **Submit** sets a `submitting` state, awaits `onSubmit(form)` (a **prop**,
  defaulting to a resolving async fn). On resolve show `success`; on reject show
  `submit-error`. Disable the submit button while pending.

Required `data-testid`s: `step-indicator`, `input-name`, `input-email`,
`input-confirm`, `next-btn`, `back-btn`, `submit-btn`, `error-name`,
`error-email`, `error-confirm`, `submitting`, `success`, `submit-error`.

## Gotchas

- Cross-field: `confirm !== email` → `error-confirm`.
- Don't advance past an invalid step.
- Await the async submit before asserting success (tests use `waitFor`).

## Run

```
npx vitest run src/modules/m06-multi-step-form/
```
