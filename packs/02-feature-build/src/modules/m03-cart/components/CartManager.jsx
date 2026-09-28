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
  const [cart, setCart] = useState([]);
   

  // TODO: implement addToCart / inc / dec and derive the totals.
  function addToCart( product) {
    // TODO
    setCart((prev) => {
      const existing = prev.find((l) => l.id === product.id);
      if (existing) {
        return prev.map((l)=> {
          if (l.id === product.id) {
            return {...l, qty: l.qty + 1};
          } 
          return l;
        })
      }
      return [...prev, {...product, qty: 1}];
    })
  }

function updateQty(productId, delta) {
  setCart((prev) =>
    prev
      .map((item) => {
        if (item.id === productId) {
          return { ...item, qty: item.qty + delta };
        }
        return item;
      })
      .filter((item) => item.qty > 0)
  );
}

  function inc(productId) {
    updateQty(productId, 1);
  }

  function dec(productId) {
    updateQty(productId, -1);
  }

  const totalCount = cart.reduce((total, item) => total + item.qty, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );


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
        {cart.map((item) => {
return(
          <div
            key={item.id}
            data-testid={`cart-line-${item.id}`}
          >

            <span>{item.name}</span>
            <button
              data-testid={`dec-${item.id}`}
              onClick={() => dec(item.id)}
            >
              -
            </button>

            <span data-testid={`qty-${item.id}`}>
              {item.qty}
            </span>

            <button
              data-testid={`inc-${item.id}`}
              onClick={() => inc(item.id)}
            >
              +
            </button>

            <span>
              ${(item.price * item.qty).toFixed(2)}
            </span>


          </div>
          )

        })
        }
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
