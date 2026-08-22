import { useState } from "react";
import ExpenseRow from "./ExpenseRow.jsx";
import {
  EXPENSES,
  CATEGORIES,
  filterByCategory,
  sumAmount,
} from "../data/expenses.js";

/**
 * 🐞 THIS IS THE FILE YOU NEED TO FIX.
 *
 * ExpenseList shows a category filter, the matching expenses, and their total.
 *
 * 🐞 BUG: the filtered list (`filtered`) AND the running `total` are copied into
 * their OWN state and are only recomputed inside the category filter's onChange
 * handler. So when you ADD a new expense, the visible list and the total go
 * STALE — the new expense doesn't appear and the total doesn't update until you
 * touch the category filter again. This is "derived state stored in state".
 *
 * Everything else in this project already works — only edit this component.
 *
 * DO NOT change or remove any existing data-testid attributes:
 *   category-filter, new-title, new-amount, add, list, list-item, total
 */
export default function ExpenseList() {
  const [expenses, setExpenses] = useState(EXPENSES);
  const [category, setCategory] = useState("All");
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState("");

  // 🐞 BUG: derived data stored in state — only recomputed in handleCategory,
  // so it goes stale whenever `expenses` changes (e.g. on Add).
  const [filtered, setFiltered] = useState(() =>
    filterByCategory(EXPENSES, "All")
  );
  const [total, setTotal] = useState(() =>
    sumAmount(filterByCategory(EXPENSES, "All"))
  );

  // TODO (fix): derive filtered list & total during render instead of storing
  // them in state.

  function handleCategory(e) {
    const next = e.target.value;
    setCategory(next);
    // Only place the derived data is recomputed — Add does not touch it.
    const nextFiltered = filterByCategory(expenses, next);
    setFiltered(nextFiltered);
    setTotal(sumAmount(nextFiltered));
  }

  function addExpense() {
    const title = newTitle.trim();
    const amount = Number(newAmount);
    if (!title || !amount) return;
    const expense = {
      id: "e" + (expenses.length + 1) + "-" + Date.now(),
      title,
      category: category === "All" ? "Food" : category,
      amount,
      date: "2026-08-10",
    };
    // 🐞 BUG: pushes to source state but never recomputes filtered/total,
    // leaving the visible list and total stale until the filter is touched.
    setExpenses((prev) => [...prev, expense]);
    setNewTitle("");
    setNewAmount("");
  }

  return (
    <div className="et-list-card">
      <div className="et-controls">
        <label className="et-field">
          Category
          <select
            data-testid="category-filter"
            className="et-select"
            value={category}
            onChange={handleCategory}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <div className="et-add">
          <input
            data-testid="new-title"
            className="et-input"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Expense title"
          />
          <input
            data-testid="new-amount"
            className="et-input et-input-amount"
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            placeholder="Amount"
          />
          <button className="et-btn" data-testid="add" onClick={addExpense}>
            Add
          </button>
        </div>
      </div>

      <ul className="et-list" data-testid="list">
        {filtered.map((exp) => (
          <ExpenseRow key={exp.id} expense={exp} />
        ))}
      </ul>

      <div className="et-total-bar">
        <span>Total</span>
        <span data-testid="total">${total}</span>
      </div>
    </div>
  );
}
