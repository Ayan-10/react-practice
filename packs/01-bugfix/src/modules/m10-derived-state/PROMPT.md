# ExpenseTracker — List and total go stale after Add

**Time box:** ~12 min · **Difficulty:** core · **Topic:** derive-during-render vs redundant state

## The app
You've been handed **ExpenseTracker**, a small but complete personal-finance app:

```
m10-derived-state/
├── App.jsx                    app root (layout + routes)
├── components/
│   ├── Navbar.jsx             brand + nav links (Expenses / Reports)
│   ├── ExpenseList.jsx  👈     THE FILE YOU FIX
│   ├── ExpenseRow.jsx         one expense row
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx              expenses page
│   └── Reports.jsx           second route (spend by category)
├── data/expenses.js          local seed data + helpers (offline)
└── styles.css
```

Run the pack (`npm run dev`) and open **m10**: a navbar, a category filter, an
add form, the expenses list, and a running total. Everything works — **except
one bug**.

## The bug
The filtered list **and** the running total are copied into their own state and
only recomputed inside the category filter's `onChange`. So when you **Add** a
new expense, the visible list and the total go **stale** — the new expense
doesn't appear and the total doesn't update until you touch the category filter
again. This is "derived state stored in state".

## Your task
Fix **only** `components/ExpenseList.jsx` so that:

1. Adding an expense immediately shows the new row **and** updates the total.
2. The category filter still narrows the list and total correctly.

## Constraints
- Edit **only** `components/ExpenseList.jsx`. The rest of the app is correct.
- **Do NOT remove or change any `data-testid`** — tests depend on them:
  `category-filter`, `new-title`, `new-amount`, `add`, `list`, `list-item`,
  `total`.

## How to run
```bash
npm test -- m10
```
Tests mount the **whole app** and drive it like a user. They FAIL first; make
them pass.

## Hint (peek only if stuck)
- Don't store `filtered`/`total` in state. **Derive** them during render:
  `const filtered = filterByCategory(expenses, category);`
  `const total = sumAmount(filtered);`
  Then delete the `filtered`/`total` `useState` + their setters and the recompute
  logic in `handleCategory`.
