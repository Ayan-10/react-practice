# Bugfix: Controlled/uncontrolled input

**Time box:** ~10 min · **Difficulty:** warmup · **Topic:** controlled inputs, generic change handler

## Bug
- The email input starts as `undefined`, making it uncontrolled (React warns and
  the field misbehaves).
- The change handler always writes to `name`, so typing in email does nothing and
  editing either field overwrites `name`.

## Task
Make both inputs controlled and update the correct field, so the preview shows
`<name> — <email>` live.

## Constraints
- Keep `data-testid`s: `name`, `email`, `preview`.

## Run
```bash
npm test -- m07
```

## Hints
- Initialise `email: ""` (never `undefined`).
- Use the input's `name` in the handler: `setForm({ ...form, [name]: value })`.
