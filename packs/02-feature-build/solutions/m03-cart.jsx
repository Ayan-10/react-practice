// SOLUTION — m03 Cart.
import { useState } from "react";
import { fallbackProducts } from "../../shared/api.js";

const PRODUCTS = fallbackProducts;

export default function Cart() {
  const [products] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((l) => l.id === product.id);
      if (existing) {
        return prev.map((l) => (l.id === product.id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function inc(id) {
    setCart((prev) => prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)));
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
    <div>
      <h2>Shop</h2>
      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <strong>{p.title}</strong>
            <p>${p.price}</p>
            <button className="btn" data-testid={`add-${p.id}`} onClick={() => addToCart(p)}>Add</button>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 24 }}>Cart</h3>
      <div data-testid="cart">
        {cart.length === 0 && <p data-testid="empty">Cart is empty</p>}
        {cart.map((line) => (
          <div key={line.id} data-testid={`cart-line-${line.id}`} style={{ display: "flex", gap: 8 }}>
            <span>{line.title}</span>
            <button data-testid={`dec-${line.id}`} onClick={() => dec(line.id)}>-</button>
            <span data-testid={`qty-${line.id}`}>{line.qty}</span>
            <button data-testid={`inc-${line.id}`} onClick={() => inc(line.id)}>+</button>
            <span>${(line.price * line.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <p>Items: <span data-testid="total-count">{totalCount}</span></p>
      <p>Total: $<span data-testid="total-price">{totalPrice.toFixed(2)}</span></p>
    </div>
  );
}
