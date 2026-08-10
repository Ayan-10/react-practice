# m08 — Dependent fetch (user → posts)

**Time box:** ~15 min

Two chained requests: first load the list of users, then when one is selected,
load **that user's posts**. The second fetch depends on the first's selection.

## Requirements

- On mount, call `loadUsers()` → array of `{ id, name }`. Render a `<select>`
  `data-testid="user-select"` with an option per user (value = user id).
- When a user is selected, call `loadPosts(userId)` → array of `{ id, title }`
  and render posts as `data-testid="post-item"` inside `data-testid="posts"`.
- Before any user is selected, show `data-testid="no-selection"` (text `Pick a user`).
- Changing the user refetches posts for the new user.

## Gotchas

- The posts effect must depend on the selected user id and skip when it's empty.
- Reset/replace posts when the user changes (don't append across users).
