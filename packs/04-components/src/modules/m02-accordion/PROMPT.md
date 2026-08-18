# m02 — FaqPage · Accordion

**Time box:** ~15 min

You're given a complete **FaqPage** mini-app: a navbar, an accordion FAQ page
(Home), and a Contact route — all working. The feature to focus on is the
accordion.

> 👉 The file to edit is **`components/Accordion.jsx`**. The dev menu / tests
> mount the whole app.

## Folder

```
m02-accordion/
  App.jsx                    app root (navbar + routes)
  index.jsx                  entry (re-exports App)
  components/
    Navbar.jsx  Footer.jsx
    Accordion.jsx            👈 THE FEATURE
  pages/    Home.jsx  Contact.jsx
  data/faqs.js               local FAQ dataset
  styles.css
```

## Requirements

- Each item has a header `data-testid="header-<id>"`.
- An open item renders a panel `data-testid="panel-<id>"`; closed items render
  nothing.
- `multi=false` (default): only one panel open at a time. `multi=true`:
  panels toggle independently.
- `items` is a prop and defaults to the local `FAQ_ITEMS`.

## Run

```
npx vitest run src/modules/m02-accordion/
```
