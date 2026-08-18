import { useState } from "react";
import CheckoutWizard from "../components/CheckoutWizard.jsx";
import { CART_SUMMARY } from "../data/checkout.js";

export default function Home() {
  const [placedOrder, setPlacedOrder] = useState(null);

  return (
    <section className="cf-page" data-testid="home-page">
      <h1 className="cf-page-title">Checkout</h1>
      <p className="cf-page-sub">
        {CART_SUMMARY.items} items · ${CART_SUMMARY.total} total
      </p>

      {/* The feature under construction lives here. */}
      <CheckoutWizard onSubmit={setPlacedOrder} />

      {placedOrder && (
        <div className="cf-confirmation" data-testid="order-confirmation">
          <h3>Order placed ✅</h3>
          <p>
            Thanks {placedOrder.name}, a receipt is on its way to{" "}
            {placedOrder.email}.
          </p>
        </div>
      )}
    </section>
  );
}
