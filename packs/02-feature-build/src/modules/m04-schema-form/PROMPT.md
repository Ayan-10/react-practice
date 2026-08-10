# Feature: Schema-Driven Form

**Time box:** ~25 min · **Difficulty:** core · **Topic:** dynamic controlled forms, validation, onSubmit

## Task (web-fundamentals round)
Render a form from a `schema` array. Collect input into controlled state,
validate on submit, and call `onSubmit(values)` with the collected data.

## Field shape
`{ name, label, type: "text"|"email"|"number", required }`

## Validation (on submit)
- `required` fields must be non-empty.
- `email` fields must contain `@`.
- If any field is invalid, render `error-<name>` for it and DO NOT call onSubmit.
- If all valid, call `onSubmit(values)` where `type:"number"` values are coerced
  to `Number`.

## Required data-testids
`field-<name>`, `error-<name>` (only when invalid), `submit`.

## Run
```bash
npm test -- m04
```

## Hints
- Initialise `values` from schema: `Object.fromEntries(schema.map(f => [f.name, ""]))`.
- Generic change handler: `setValues(v => ({ ...v, [name]: value }))`.
- Build an `errors` object during validation; coerce numbers when building the
  final payload.
