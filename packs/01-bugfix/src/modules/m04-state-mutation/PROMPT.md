# Bugfix: Direct state mutation (no re-render)

**Time box:** ~10 min · **Difficulty:** warmup · **Topic:** immutable state updates

## Bug
Adding or removing a tag doesn't update the UI, because the handlers mutate the
existing array (`push`/`splice`) and pass the same reference to `setState`.

## Task
Make **Add** append a tag and **×** remove a tag, with the list updating each time.

## Constraints
- Keep `data-testid`s: `tag-input`, `add-tag`, `tag-list`, `tag-item`, `remove-<tag>`.

## Run
```bash
npm test -- m04
```

## Hint
Create a **new array**: `setTags([...tags, newTag])` and
`setTags(tags.filter((_, i) => i !== index))`.
