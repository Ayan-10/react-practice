# DailyPlanner — Build the todo list

**Time box:** ~20 min · **Difficulty:** warmup/core · **Topic:** CRUD list state, toggle, filter tabs, derived count

## The app
You've been handed **DailyPlanner**, a small but complete daily task app:

```
m06-todo/
├── App.jsx                    app root (layout + routes)
├── components/
│   ├── Navbar.jsx             top bar (brand + nav links)
│   ├── TodoList.jsx  👈        THE FILE YOU BUILD
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx              today page (renders TodoList)
│   └── About.jsx             second route
├── data/tasks.js            local seed tasks (offline)
└── styles.css
```

Run the pack (`npm run dev`) and open **m06** to see it live: a navbar, the
planner with a few seeded tasks, and an About page. Everything renders —
**except the todo list is inert**. Right now the tasks show up but you can't
add, check off, delete, or filter them.

## Your task
Build **only** `components/TodoList.jsx` so the planner becomes fully
interactive. State is **frontend only** (no API calls).

1. **Add** a todo from the input when Add is clicked. Ignore empty /
   whitespace-only text, and clear the input after adding.
2. **Toggle** a todo complete/incomplete via its checkbox.
3. **Delete** a todo via its `×` button.
4. **Filter** tabs: `All` / `Active` / `Completed` show the matching subset.
5. **items-left** = the number of ACTIVE (not done) todos.

The list is seeded from `data/tasks.js` (3 starter tasks: one done, two active).

## Required data-testids (mandatory for grading)
- Text input: `new-todo` · Add button: `add-btn`
- Each visible item: `todo-item`
- Per item: `toggle-<id>` (checkbox), `delete-<id>` (delete button),
  `label-<id>` (the text)
- Filter tabs: `filter-all`, `filter-active`, `filter-completed`
- Active count: `items-left`
- Completed items must have a **class containing `done`**.

## How to run
```bash
npm test -- m06
```
Tests mount the **whole app** and drive it like a user. The app renders on the
stub; the feature tests FAIL first — make them pass.

## Hints (peek only if stuck)
- Keep todos in state: `const [todos, setTodos] = useState(SEED_TASKS)`.
- Add: `setTodos(prev => [...prev, { id, text: t, done: false }])`; make a
  fresh unique `id` (a counter or `crypto.randomUUID()` / `Date.now()`).
- Toggle: `map` and flip `done` on the matching id. Delete: `filter` it out.
- `visible = todos.filter(t => filter === "active" ? !t.done : filter === "completed" ? t.done : true)`.
- `itemsLeft = todos.filter(t => !t.done).length`.
- Helpers live in `../data/tasks.js`: `activeCount`, `filterTasks`.
