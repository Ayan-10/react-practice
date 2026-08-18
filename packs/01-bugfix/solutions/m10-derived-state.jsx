// SOLUTION — m10 ExpenseTracker. The fix for components/ExpenseList.jsx: don't
// store `filtered`/`total` in state. DERIVE them during render from `expenses` +
// `category`, so they're always fresh (the new expense shows and the total
// updates immediately on Add).
// Copy this file over components/ExpenseList.jsx to self-check.
import { useState } from "react";
import ExpenseRow from "./ExpenseRow.jsx";
import {
  EXPENSES,
  CATEGORIES,
  filterByCategory,
  sumAmount,
} from "../data/expenses.js";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState(EXPENSES);
  const [category, setCategory] = useState("All");
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState("");

  // ✅ FIX: derived during render — always fresh, no redundant state.
  const filtered = filterByCategory(expenses, category);
  const total = sumAmount(filtered);

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
            onChange={(e) => setCategory(e.target.value)}
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
