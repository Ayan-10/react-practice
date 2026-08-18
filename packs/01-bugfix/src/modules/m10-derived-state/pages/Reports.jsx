import { Link } from "react-router-dom";
import { EXPENSES, CATEGORIES, filterByCategory, sumAmount } from "../data/expenses.js";

// A second route: a static spend-by-category breakdown from the seed data.
// Navigating here unmounts the Home page. Purely informational.
export default function Reports() {
  const rows = CATEGORIES.filter((c) => c !== "All").map((cat) => ({
    cat,
    total: sumAmount(filterByCategory(EXPENSES, cat)),
  }));
  const grand = sumAmount(EXPENSES);

  return (
    <section className="et-page" data-testid="reports-page">
      <Link to="/" className="et-back">← Back to expenses</Link>
      <h1 className="et-page-title">Reports</h1>
      <p className="et-page-sub">Spend by category (seed data).</p>
      <ul className="et-report-list">
        {rows.map((r) => (
          <li key={r.cat} className="et-report-row" data-testid="report-row">
            <span className="et-report-cat">{r.cat}</span>
            <span className="et-report-amount">${r.total}</span>
          </li>
        ))}
      </ul>
      <div className="et-total-bar">
        <span>Grand total</span>
        <span data-testid="report-total">${grand}</span>
      </div>
    </section>
  );
}
