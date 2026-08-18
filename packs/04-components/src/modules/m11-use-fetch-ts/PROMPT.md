# m11 — DataLoader · [TS] useFetch hook (generics)

**Time box:** ~15 min

You're given a complete **DataLoader** mini-app: a navbar, a user directory
(Home), and a Docs route — all working. The ONE thing to build is the generic
`useFetch<T>` hook and its typed consumer.

> 👉 The file to edit is **`components/UserList.tsx`**. Everything else already
> works. The dev menu / tests mount the whole app.

## Folder

```
m11-use-fetch-ts/
  App.tsx                    app root (navbar + routes)
  index.tsx                  entry (re-exports App)
  components/
    Navbar.tsx  Footer.tsx
    UserList.tsx             👈 BUILD THIS (useFetch + UserList + types)
  pages/    Home.tsx  Docs.tsx
  data/users.ts              local users + default loadUsers()
  styles.css
```

## Requirements

- Export `useFetch<T>(fn: () => Promise<T>): { data: T | null; loading: boolean; error: Error | null }`.
- Runs `fn()` on mount / when `fn` changes; `loading` starts true, `data` null,
  `error` null; on success set data + loading false; on failure set error +
  loading false; ignore results after unmount.
- Default export `UserList` uses `useFetch<User[]>(loadUsers)` and renders:
  `data-testid="loading"`, `data-testid="error"`, or `data-testid="user-item"` per user.
- Define and export a `User` type `{ id: number; name: string }`.
- Default `loadUsers` prop comes from the local `data/users.ts`.

## Gotchas

- Keep the generic `T` — don't fall back to `any`.
- Guard state updates after unmount (`let alive` flag).

## Run

```
npx vitest run src/modules/m11-use-fetch-ts/
```
