# Bugfix: Wrong list key leaks state between rows

**Time box:** ~12 min · **Difficulty:** core · **Topic:** list keys, component identity

## Bug
Each row has its own note input. If you type notes then delete a row, the notes
jump to the wrong person — because the list uses the array **index** as the key,
so React reuses the wrong component instance after a deletion.

## Task
Fix the key so each person's note stays with that person after any deletion.

## Constraints
- Keep `data-testid`s: `row-<id>`, `name-<id>`, `note-<id>`, `remove-<id>`.
- Each person has a stable unique `id` — use it.

## Run
```bash
npm test -- m06
```

## Hint
`key={person.id}` instead of `key={index}`.
