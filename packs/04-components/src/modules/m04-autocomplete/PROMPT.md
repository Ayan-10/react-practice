# m04 — CommandPalette · Autocomplete

**Time box:** ~20 min

You're given a complete **CommandPalette** mini-app: a navbar, a searchable
palette (Home), and a Shortcuts route — all working. The feature to focus on is
the autocomplete.

> 👉 The file to edit is **`components/Autocomplete.jsx`**. The dev menu / tests
> mount the whole app.

## Folder

```
m04-autocomplete/
  App.jsx                    app root (navbar + routes)
  index.jsx                  entry (re-exports App)
  components/
    Navbar.jsx  Footer.jsx
    Autocomplete.jsx         👈 THE FEATURE
  pages/    Home.jsx  Shortcuts.jsx
  data/commands.js           local commands + default async loader
  styles.css
```

## Requirements

- Input `data-testid="ac-input"`. Typing fetches suggestions via
  `getSuggestions(q)` (a prop, defaults to the local `loadCommands`).
- Results render in `data-testid="ac-list"` with each option
  `data-testid="option-<i>"`.
- ArrowDown/ArrowUp move the highlight (highlighted option has a class
  containing `highlight`); Enter selects it.
- Clicking an option selects it. Selecting fills the input and closes the list.

## Run

```
npx vitest run src/modules/m04-autocomplete/
```
