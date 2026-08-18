import { Link } from "react-router-dom";
import { SALES_ROWS } from "../data/sales.js";

const total = SALES_ROWS.reduce((sum, r) => sum + r.price, 0);
const avgRating = (
  SALES_ROWS.reduce((sum, r) => sum + r.rating, 0) / SALES_ROWS.length
).toFixed(2);

export default function Summary() {
  return (
    <section className="st-page" data-testid="summary-page">
      <Link to="/" className="st-back" data-testid="back-home">
        ← Back to table
      </Link>
      <h1 className="st-page-title">Summary</h1>
      <p className="st-page-sub">{SALES_ROWS.length} products</p>
      <ul className="st-summary">
        <li>Total price: {total}</li>
        <li>Average rating: {avgRating}</li>
      </ul>
    </section>
  );
}
