// SOLUTION — m03 GroceryCart cart management.
// Copy this over components/CartManager.jsx to self-check.
import { useState } from "react";
import { PRODUCTS } from "../data/products.js";
import ProductCard from "./ProductCard.jsx";

export default function CartManager() {
  const [products] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((l) => l.id === product.id);
      if (existing) {
        return prev.map((l) =>
          l.id === product.id ? { ...l, qty: l.qty + 1 } : l
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function inc(id) {
    setCart((prev) =>
      prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
    );
  }

  function dec(id) {
    setCart((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0)
    );
  }

  const totalCount = cart.reduce((s, l) => s + l.qty, 0);
  const totalPrice = cart.reduce((s, l) => s + l.price * l.qty, 0);

  return (
    <div className="gc-feature">
      <h2 className="gc-feature-title">Fresh picks</h2>

      <div className="gc-grid" data-testid="product-list">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>

      <h3 className="gc-cart-title">Your cart</h3>
      <div className="gc-cart" data-testid="cart">
        {cart.length === 0 && <p data-testid="empty">Cart is empty</p>}

        {cart.map((line) => (
          <div
            key={line.id}
            className="gc-cart-line"
            data-testid={`cart-line-${line.id}`}
          >
            <span className="gc-cart-name">{line.title}</span>
            <button
              className="gc-qty-btn"
              data-testid={`dec-${line.id}`}
              onClick={() => dec(line.id)}
            >
              −
            </button>
            <span data-testid={`qty-${line.id}`}>{line.qty}</span>
            <button
              className="gc-qty-btn"
              data-testid={`inc-${line.id}`}
              onClick={() => inc(line.id)}
            >
              +
            </button>
            <span className="gc-line-price">
              ${(line.price * line.qty).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="gc-totals">
        <p>
          Items: <span data-testid="total-count">{totalCount}</span>
        </p>
        <p>
          Total: $<span data-testid="total-price">{totalPrice.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}
