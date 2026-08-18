# m01 — DocsViewer · Tabs

**Time box:** ~15 min

You're given a complete **DocsViewer** mini-app: a navbar, a tabbed docs page
(Home), and a Changelog route — all working. The feature to focus on is the
tab switcher.

> 👉 The file to edit is **`components/Tabs.jsx`**. The dev menu / tests mount
> the whole app.

## Folder

```
m01-tabs/
  App.jsx                    app root (navbar + routes)
  index.jsx                  entry (re-exports App)
  components/
    Navbar.jsx  Footer.jsx
    Tabs.jsx                 👈 THE FEATURE
  pages/    Home.jsx  Changelog.jsx
  data/docs.js               local tabs dataset
  styles.css
```

## Requirements

- Each tab button has `data-testid="tab-<id>"`; the active one has a class
  containing `active`.
- Exactly one panel (`data-testid="panel"`) is visible, showing the active
  tab's content.
- Clicking a tab switches the visible panel.
- `tabs` is a prop and defaults to the local `DOCS_TABS`.

## Run

```
npx vitest run src/modules/m01-tabs/
```
