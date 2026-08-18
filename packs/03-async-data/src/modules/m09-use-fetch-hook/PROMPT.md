# m09 — CountryStats · useFetch custom hook

**Time box:** ~15 min

You're given a complete **CountryStats** mini-app: a navbar, a country list
(Home), and an About route — all working. The ONE thing to build is the
reusable `useFetch` hook and the list that consumes it.

> 👉 The file to edit is **`components/UserList.jsx`**. Everything else already
> works. The dev menu / tests mount the whole app.

Extract data-fetching into a reusable `useFetch(fn)` hook and consume it in a
component. This is a very common "show me you can abstract effects" ask.

## Folder

```
m09-use-fetch-hook/
  App.jsx                    app root (navbar + routes)
  index.jsx                  entry (re-exports App)
  components/
    Navbar.jsx  Footer.jsx  CountryCard.jsx
    UserList.jsx             👈 BUILD THIS (useFetch + UserList)
  pages/    Home.jsx  About.jsx
  data/countries.js          local countries + default loadCountries()
  styles.css
```

## Requirements

Export a **named** hook `useFetch(fn)` that:
- runs `fn()` on mount (and again if `fn` changes),
- returns `{ data, loading, error }`,
- starts `loading: true`, `data: null`, `error: null`,
- on success sets `data` and `loading: false`,
- on failure sets `error` (the caught error) and `loading: false`,
- ignores a resolved/rejected result after unmount (no state update on dead component).

The **default export** `UserList` uses `useFetch(loadUsers)` and renders:
- `data-testid="loading"` while loading,
- `data-testid="error"` on error,
- `data-testid="user-item"` per country inside `data-testid="user-list"`.

`loadUsers` is a prop (tests inject a mock) and defaults to the local
`loadCountries`.

## Gotchas

- Guard against setting state after unmount (the classic `let alive` flag).
- Re-run when `fn` identity changes (put it in the dependency array).

## Run

```
npx vitest run src/modules/m09-use-fetch-hook/
```
