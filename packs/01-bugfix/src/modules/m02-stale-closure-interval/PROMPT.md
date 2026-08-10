# Bugfix: Stale closure in setInterval

**Time box:** ~10 min · **Difficulty:** core · **Topic:** stale closures, functional state updates

## Bug
Click **Start**. The counter goes to `1` and then stops. It should keep counting
`1, 2, 3, ...` once per second.

## Task
Fix the auto-increment so the count keeps advancing while running.

## Constraints
- Keep `data-testid="count"` and `data-testid="toggle"`.
- Don't restructure the component; the fix is small.

## Run
```bash
npm test -- m02
```

## Hint
The interval callback captured the initial `count` (a stale closure). Use the
**functional updater** `setCount(c => c + 1)` so you never read stale state.
