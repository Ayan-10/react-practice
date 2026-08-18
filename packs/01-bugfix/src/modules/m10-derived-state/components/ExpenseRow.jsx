export default function ExpenseRow({ expense }) {
  return (
    <li className="et-row" data-testid="list-item">
      <span className="et-row-title">{expense.title}</span>
      <span className="et-row-cat">{expense.category}</span>
      <span className="et-row-amount">${expense.amount}</span>
    </li>
  );
}
