import { useState } from "react";
import { PRODUCTS } from "../data/products.js";
import ProductCard from "./ProductCard.jsx";

// TODO: implement the cart management + live totals (see PROMPT.md).
// Required behavior:
//   - "Add to cart" a product (increment its qty if already present),
//   - increase / decrease a line's quantity from within the cart,
//   - remove a line when its quantity hits 0 via decrease,
//   - show the total item count and total price, updating in real time.
// Required data-testids: add-<id> (on the card), cart-line-<id>, qty-<id>,
//   inc-<id>, dec-<id>, total-count, total-price.
export default function CartManager() {
  const [products] = useState(PRODUCTS);
  // cart shape: array of { ...product, qty }
  const [cart] = useState([]);

  // TODO: implement addToCart / inc / dec and derive the totals.
  function addToCart(/* product */) {
    // TODO
  }

  const totalCount = 0;
  const totalPrice = 0;

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
        {/* TODO: render a cart-line-<id> row per cart line with qty + inc/dec */}
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
