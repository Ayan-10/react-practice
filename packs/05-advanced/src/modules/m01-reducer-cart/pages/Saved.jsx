import { Link } from "react-router-dom";
import { SAVED } from "../data/products.js";

// A second real route so navigation works — items saved for later.
export default function Saved() {
  return (
    <section className="bb-page" data-testid="saved-page">
      <Link to="/" className="bb-back" data-testid="back-home">
        ← Back to shop
      </Link>
      <h1 className="bb-page-title">Saved for later</h1>
      <p className="bb-page-sub">{SAVED.length} items</p>
      <ul className="bb-saved-list">
        {SAVED.map((s) => (
          <li key={s.id} className="bb-saved-item">
            <span>{s.name}</span>
            <span>${s.price}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
