import { useState } from "react";
import { fallbackProducts } from "../../shared/api.js";

/**
 * FEATURE MODULE m03 — Cart management.
 *
 * A product catalog is shown. Implement cart behavior:
 *   - "Add" a product to the cart (if already in cart, increment its quantity).
 *   - Increase / decrease quantity from within the cart.
 *   - When quantity hits 0 via decrease, remove the line from the cart.
 *   - Show total item count and total price, updating in real time.
 *
 * Required data-testids:
 *   - add-<id>            : add-to-cart button for a product
 *   - cart-line-<id>      : a line in the cart
 *   - qty-<id>            : the quantity text for a cart line
 *   - inc-<id> / dec-<id> : increment / decrement buttons
 *   - total-count         : total number of items (sum of quantities)
 *   - total-price         : total price, 2 decimals
 */
const PRODUCTS = fallbackProducts;

export default function Cart() {
  const [products] = useState(PRODUCTS);
  // cart shape suggestion: { [id]: { product, qty } } or array of { ...product, qty }
  const [cart, setCart] = useState([]);

  // TODO: implement addToCart(product), inc(id), dec(id)
  // TODO: compute totalCount and totalPrice from cart

  const totalCount = 0;   // replace
  const totalPrice = 0;   // replace

  return (
    <div>
      <h2>Shop</h2>
      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <strong>{p.title}</strong>
            <p>${p.price}</p>
            <button className="btn" data-testid={`add-${p.id}`} /* onClick={() => addToCart(p)} */>
              Add
            </button>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 24 }}>Cart</h3>
      <div data-testid="cart">
        {cart.length === 0 && <p data-testid="empty">Cart is empty</p>}
        {cart.map((line) => (
          <div key={line.id} data-testid={`cart-line-${line.id}`} style={{ display: "flex", gap: 8 }}>
            <span>{line.title}</span>
            <button data-testid={`dec-${line.id}`}>-</button>
            <span data-testid={`qty-${line.id}`}>{line.qty}</span>
            <button data-testid={`inc-${line.id}`}>+</button>
            <span>${(line.price * line.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <p>Items: <span data-testid="total-count">{totalCount}</span></p>
      <p>Total: $<span data-testid="total-price">{totalPrice.toFixed(2)}</span></p>
    </div>
  );
}
