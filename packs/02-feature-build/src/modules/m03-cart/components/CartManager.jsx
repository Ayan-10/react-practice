import { useState } from "react";
import { PRODUCTS } from "../data/products.js";
import ProductCard from "./ProductCard.jsx";

/**
 * FEATURE MODULE m03 — Cart management (👈 THIS is the file you build).
 *
 * Read PROMPT.md. Right now this component only renders the product grid and an
 * empty cart. You must IMPLEMENT the cart behavior + live totals.
 *
 * Required behavior:
 *   - "Add to cart" a product (if already in cart, increment its quantity).
 *   - Increase / decrease quantity from within the cart.
 *   - When quantity hits 0 via decrease, remove that line from the cart.
 *   - Show total item count and total price, updating in real time.
 *
 * Required data-testids:
 *   - add-<id>            : add-to-cart button for a product (already on the card)
 *   - cart-line-<id>      : a line in the cart
 *   - qty-<id>            : the quantity text for a cart line
 *   - inc-<id> / dec-<id> : increment / decrement buttons
 *   - total-count         : total number of items (sum of quantities)
 *   - total-price         : total price, 2 decimals
 */
export default function CartManager() {
  const [products] = useState(PRODUCTS);
  // cart shape: array of { ...product, qty }
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((line) => line.id === product.id);
      if (existing) {
        return prev.map((line) =>
          line.id === product.id ? { ...line, qty: line.qty + 1 } : line
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function inc(id) {
    setCart((prev) =>
      prev.map((line) =>
        line.id === id ? { ...line, qty: line.qty + 1 } : line
      )
    );
  }

  function dec(id) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.id === id ? { ...line, qty: line.qty - 1 } : line
        )
        .filter((line) => line.qty > 0)
    );
  }

  const totalCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const totalPrice = cart.reduce((sum, line) => sum + line.price * line.qty, 0);

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
            <button data-testid={`dec-${line.id}`} onClick={() => dec(line.id)}>
              −
            </button>
            <span data-testid={`qty-${line.id}`}>{line.qty}</span>
            <button data-testid={`inc-${line.id}`} onClick={() => inc(line.id)}>
              +
            </button>
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
