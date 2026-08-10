# Bugfix: SearchBar closes on outside click

**Time box:** ~20 min · **Difficulty:** core · **Topic:** `useRef`, DOM event listeners, `useEffect` cleanup, router side effects

## Context
A travel app has a search bar in the navbar. When you type, a results dropdown
opens. There is a usability bug: once open, the dropdown **stays open** even when
the user clicks elsewhere on the page or navigates to a new page.

## Task
Fix `index.jsx` so that:

1. When the user clicks **outside** the search bar, the dropdown closes.
2. The dropdown stays open when the user is **typing** or **interacting with the
   results** (clicking inside the dropdown must NOT close it).
3. The dropdown closes automatically when the **route changes** (navigation).

## Constraints
- **Do NOT remove or change any `data-testid`** — the tests depend on them:
  - `search-input`, `search-div`, `apartment-name-search-result`
- Frontend-only. Add event listeners and clean them up properly on unmount.

## How to run
```bash
npm test -- m01
```
It should FAIL first. Make it pass by implementing the outside-click + route-change close.

## Hints (peek only if stuck)
- Attach a `mousedown` listener to `document`; if the click target is not inside
  `searchRef.current`, call `setOpen(false)`.
- Add/remove the listener in a `useEffect` (return a cleanup function).
- Add a second `useEffect` with `[location]` (or `location.pathname`) as the dep
  that closes the dropdown when the route changes.
