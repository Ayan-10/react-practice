# m11 — [TS] useFetch hook (generics)

**Time box:** ~15 min

Build a **generic** `useFetch<T>` hook in TypeScript and a typed consumer.

## Requirements

- Export `useFetch<T>(fn: () => Promise<T>): { data: T | null; loading: boolean; error: Error | null }`.
- Runs `fn()` on mount / when `fn` changes; `loading` starts true, `data` null,
  `error` null; on success set data + loading false; on failure set error +
  loading false; ignore results after unmount.
- Default export `UserList` uses `useFetch<User[]>(loadUsers)` and renders:
  `data-testid="loading"`, `data-testid="error"`, or `data-testid="user-item"` per user.
- Define a `User` type `{ id: number; name: string }`.

## Gotchas

- Keep the generic `T` — don't fall back to `any`.
- Guard state updates after unmount (`let active` flag).
