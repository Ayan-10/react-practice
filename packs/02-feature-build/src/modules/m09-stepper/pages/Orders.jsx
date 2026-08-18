import { Link } from "react-router-dom";

// A second real route so navigation works. It lists a few static past orders.
// Proves the app is a full mini-app, not one screen.
const PAST_ORDERS = [
  { id: "ORD-1001", items: 2, total: 96, status: "Delivered" },
  { id: "ORD-1002", items: 1, total: 40, status: "Shipped" },
  { id: "ORD-1003", items: 4, total: 212, status: "Processing" },
];

export default function Orders() {
  return (
    <section className="cf-page" data-testid="orders-page">
      <Link to="/" className="cf-back" data-testid="back-cart">
        ← Back to cart
      </Link>
      <h1 className="cf-page-title">Your orders</h1>
      <p className="cf-page-sub">A history of your recent purchases</p>
      <ul className="cf-order-list">
        {PAST_ORDERS.map((o) => (
          <li key={o.id} className="cf-order-row">
            <strong>{o.id}</strong>
            <span className="cf-order-meta">
              {o.items} item{o.items === 1 ? "" : "s"} · ${o.total} · {o.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
