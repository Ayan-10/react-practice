# TaskBoard — Checkbox state leaks to the wrong task

**Time box:** ~15 min · **Difficulty:** core · **Topic:** list `key`, component identity, reconciliation

## The app
You've been handed **TaskBoard**, a small but complete task-list app:

```
m06-list-key-bug/
├── App.jsx                    app root (layout + routes)
├── components/
│   ├── Navbar.jsx             top bar (brand + nav links)
│   ├── TaskList.jsx   👈      THE FILE YOU FIX
│   ├── TaskRow.jsx           one task row (holds its own "done" checkbox)
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx             the board
│   └── Archive.jsx         second route (completed tasks)
├── data/tasks.js           local dataset (offline)
└── styles.css
```

Run the pack (`npm run dev`) and open **m06** to see it live: a navbar, a board
of tasks each with a "done" checkbox and a Delete button, and an Archive page.
Everything works — **except one bug**.

## The bug
Each task row keeps its OWN local state — the **done** checkbox. Check off a
task, then **delete a different task above it**, and the checkmark suddenly
appears on the **wrong task**. The per-row state "leaks" to a neighbour.

Why: `components/TaskList.jsx` renders the list using the array **index** as the
React `key`. When a row is removed, every row below it shifts up an index, so
React re-matches the old component instances (and their checkbox state) to the
wrong tasks.

## Your task
Fix **only** `components/TaskList.jsx` so that each row's checkbox stays tied to
its own task after any deletion.

## Constraints
- Edit **only** `components/TaskList.jsx`. The rest of the app is correct.
- **Do NOT remove or change any `data-testid`** — the tests depend on them:
  `task-list`, `row-<id>`, `title-<id>`, `done-<id>`, `remove-<id>`.
- Each task has a stable unique `id` — use it.

## How to run
```bash
npm test -- m06
```
Tests mount the **whole app** and drive it like a user. They FAIL first; make
them pass.

## Hint (peek only if stuck)
- Use the task's stable id as the list key: `key={task.id}` instead of
  `key={index}`.
