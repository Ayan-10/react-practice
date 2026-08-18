# JobApply — Build the schema-driven application form

**Time box:** ~25 min · **Difficulty:** core · **Topic:** dynamic controlled forms, validation, onSubmit emit

## The app
You've been handed **JobApply**, a small but complete job-application app:

```
m04-schema-form/
├── App.jsx                    app root (layout + routes)
├── components/
│   ├── Navbar.jsx             top bar (brand + nav links)
│   ├── SchemaForm.jsx  👈      THE FILE YOU BUILD
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx              apply page (renders SchemaForm)
│   └── Submissions.jsx       second route (lists the schema fields)
├── data/schema.js           local form schema (offline)
└── styles.css
```

Run the pack (`npm run dev`) and open **m04** to see it live: a navbar, an
application form, and a Submissions page. Everything works — **except the form
does nothing yet**. The inputs render, but typing is not tracked, submitting
neither validates nor emits anything.

## Your task
Build **only** `components/SchemaForm.jsx` so the form is driven entirely by the
`schema` array: track input in controlled state, validate on submit, and call
`onSubmit(values)` with the collected data. Everything is **frontend only**.

## Field shape
`{ name, label, type: "text"|"email"|"number", required }`

## Validation (on submit)
1. `required` fields must be **non-empty**.
2. `email` fields must contain `@`.
3. If any field is invalid, render `error-<name>` for it and **DO NOT** call
   `onSubmit`.
4. If all valid, call `onSubmit(values)` where `type:"number"` values are
   coerced to `Number`.

## Required data-testids (mandatory for grading)
- Each input: `field-<name>` (already provided in the stub)
- Each error message: `error-<name>` (only rendered when that field is invalid)
- Submit button: `submit` (already provided in the stub)

## How to run
```bash
npm test -- m04
```
Tests mount the **whole app** and drive it like a user. The app renders on the
stub; the feature tests FAIL first — make them pass. (A valid submit surfaces a
receipt on the Home page via the `onSubmit` callback.)

## Hints (peek only if stuck)
- Initialise `values` from schema:
  `Object.fromEntries(schema.map((f) => [f.name, ""]))`.
- Generic change handler: `setValues((v) => ({ ...v, [name]: value }))` using
  `e.target.name` / `e.target.value`.
- Build an `errors` object while validating; if it has keys, `setErrors` and
  bail before calling `onSubmit`.
- Coerce the payload: `f.type === "number" ? Number(values[f.name]) : values[f.name]`.
