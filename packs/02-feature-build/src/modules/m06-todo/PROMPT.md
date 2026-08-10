# Feature: Todo List

**Time box:** ~20 min · **Difficulty:** warmup/core · **Topic:** CRUD list, toggle, filter tabs, derived count

## Task
Add / toggle / delete todos, filter by All/Active/Completed, and show items-left.

## Required data-testids
`new-todo`, `add-btn`, `todo-item`, `toggle-<id>`, `delete-<id>`, `label-<id>`,
`filter-all`, `filter-active`, `filter-completed`, `items-left`.
Completed items get a class containing `done`.

## Behavior
- Add ignores empty/whitespace input and clears the box.
- Toggle flips a todo's `done`.
- Delete removes it.
- Filter shows all / only active / only completed.
- `items-left` = number of active (not done) todos.

## Run
```bash
npm test -- m06
```
