# Bugfix: Form submit reloads the page

**Time box:** ~8 min · **Difficulty:** warmup · **Topic:** form submit, preventDefault

## Bug
Submitting the form triggers the browser's default submit (full page reload), so
the SPA state is lost. The item should be added in-place with no navigation.

## Task
Prevent the default submit and append the typed item to the list; clear the input.

## Constraints
- Keep `data-testid`s: `form`, `item-input`, `submit`, `items`, `item`.
- The submit handler must call `e.preventDefault()`.

## Run
```bash
npm test -- m08
```

## Hint
`function handleSubmit(e) { e.preventDefault(); ... }`
