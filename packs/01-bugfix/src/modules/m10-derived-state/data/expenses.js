// Local dataset for the ExpenseTracker mini-app. Works fully offline.
// In a real OA you'd fetch this; here it's local so the app always renders.

export const CATEGORIES = ["All", "Food", "Transport", "Bills", "Fun"];

export const EXPENSES = [
  { id: "e1", title: "Groceries", category: "Food", amount: 54, date: "2026-08-01" },
  { id: "e2", title: "Bus pass", category: "Transport", amount: 30, date: "2026-08-02" },
  { id: "e3", title: "Electricity", category: "Bills", amount: 88, date: "2026-08-03" },
  { id: "e4", title: "Movie night", category: "Fun", amount: 24, date: "2026-08-04" },
  { id: "e5", title: "Coffee", category: "Food", amount: 12, date: "2026-08-05" },
];

/**
 * Filters expenses by category. "All" (or empty) returns everything.
 * Pure helper so both the buggy component and the solution can reuse it.
 */
export function filterByCategory(expenses, category) {
  if (!category || category === "All") return expenses;
  return expenses.filter((e) => e.category === category);
}

/** Sums the amount of a list of expenses. */
export function sumAmount(expenses) {
  return expenses.reduce((acc, e) => acc + e.amount, 0);
}
