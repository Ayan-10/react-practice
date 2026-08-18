import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products.js";

// A second real route so navigation works. (Pretend these are past deliveries.)
// Proves the app is a full mini-app, not a single screen.
const PAST_ORDERS = [
  { id: "o-1001", date: "2026-07-28", items: PRODUCTS.slice(0, 3), total: 140 },
  { id: "o-1000", date: "2026-07-14", items: PRODUCTS.slice(2, 5), total: 125 },
];

export default function Orders() {
  return (
    <section className="gc-page" data-testid="orders-page">
      <Link to="/" className="gc-back" data-testid="back-shop">
        ← Back to shop
      </Link>
      <h1 className="gc-page-title">Past orders</h1>
      <p className="gc-page-sub">{PAST_ORDERS.length} deliveries</p>
      <div className="gc-orders">
        {PAST_ORDERS.map((o) => (
          <div key={o.id} className="gc-order" data-testid={`order-${o.id}`}>
            <div className="gc-order-head">
              <strong>{o.id}</strong>
              <span>{o.date}</span>
            </div>
            <p className="gc-order-items">
              {o.items.map((i) => i.title).join(" · ")}
            </p>
            <p className="gc-order-total">Total: ${o.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
