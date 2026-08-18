# m08 — TeamDirectory · Dependent fetch (member → projects)

**Time box:** ~15 min

You're given a complete **TeamDirectory** mini-app: a navbar, a people browser
(Home), and an Org route — all working. The ONE thing to build is the dependent
fetch: pick a member, then load THAT member's projects.

> 👉 The file to edit is **`components/DependentFetch.jsx`**. Everything else
> already works. The dev menu / tests mount the whole app.

Two chained requests: first load the list of members, then when one is selected,
load **that member's projects**. The second fetch depends on the first's
selection.

## Folder

```
m08-dependent-fetch/
  App.jsx                    app root (navbar + routes)
  index.jsx                  entry (re-exports App)
  components/
    Navbar.jsx  Footer.jsx  MemberCard.jsx
    DependentFetch.jsx       👈 BUILD THIS
  pages/    Home.jsx  Org.jsx
  data/team.js               local members + default loadUsers()/loadPosts()
  styles.css
```

## Requirements

- On mount, call `loadUsers()` → array of `{ id, name }`. Render a `<select>`
  `data-testid="user-select"` with an option per user (value = user id).
- When a user is selected, call `loadPosts(userId)` → array of `{ id, title }`
  and render them as `data-testid="post-item"` inside `data-testid="posts"`.
- Before any user is selected, show `data-testid="no-selection"` (text `Pick a user`).
- Changing the user refetches posts for the new user.
- `loadUsers` / `loadPosts` are props (tests inject mocks) and default to the
  local loaders in `data/team.js`.

## Gotchas

- The posts effect must depend on the selected user id and skip when it's empty.
- Reset/replace posts when the user changes (don't append across users).

## Run

```
npx vitest run src/modules/m08-dependent-fetch/
```
