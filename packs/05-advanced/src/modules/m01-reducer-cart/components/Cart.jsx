import { useReducer } from "react";
import { PRODUCTS } from "../data/products.js";

/**
 * THE FEATURE TO BUILD — m01 BudgetBuddy cart, driven by useReducer.
 *
 * Manage the cart with a reducer (NOT a pile of useStates). The reducer must
 * handle these action types:
 *   - { type: "add", product }   → add product, or bump qty if already there
 *   - { type: "inc", id }        → +1 qty
 *   - { type: "dec", id }        → -1 qty, REMOVING the line when qty hits 0
 *   - { type: "clear" }          → empty the cart
 *
 * State shape: { items: [{ id, name, price, qty }] }
 *
 * REQUIRED data-testids:
 *   - add-<id>            (one "Add" button per product in the catalogue)
 *   - line-<id>          (a cart line for a product in the cart)
 *   - qty-<id>           (that line's quantity)
 *   - inc-<id> / dec-<id> (the +/- buttons on that line)
 *   - clear-cart         (empties the cart)
 *   - cart-count         (total number of items across all lines)
 *   - cart-total         (sum of price*qty across all lines, e.g. "185")
 *
 * Rendering rules:
 *   - When the cart is empty, render an element with data-testid="cart-empty".
 */
export const initialState = { items: [] };

export function cartReducer(state, action) {
  // TODO: implement the reducer (add / inc / dec / clear).
  return state;
}

export default function Cart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { items } = state;

  const count = items.reduce((n, it) => n + it.qty, 0);
  const total = items.reduce((n, it) => n + it.price * it.qty, 0);

  return (
    <div className="bb-cart">
      <div className="bb-catalogue">
        <h2 className="bb-h2">Catalogue</h2>
        <ul className="bb-product-list">
          {PRODUCTS.map((p) => (
            <li key={p.id} className="bb-product">
              <span className="bb-product-name">{p.name}</span>
              <span className="bb-product-price">${p.price}</span>
              <button
                className="btn"
                data-testid={`add-${p.id}`}
                onClick={() => dispatch({ type: "add", product: p })}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bb-basket">
        <div className="bb-basket-head">
          <h2 className="bb-h2">Your cart</h2>
          <button
            className="btn secondary"
            data-testid="clear-cart"
            onClick={() => dispatch({ type: "clear" })}
          >
            Clear
          </button>
        </div>

        {items.length === 0 ? (
          <p data-testid="cart-empty" className="bb-empty">
            Your cart is empty.
          </p>
        ) : (
          <ul className="bb-lines">
            {items.map((it) => (
              <li key={it.id} className="bb-line" data-testid={`line-${it.id}`}>
                <span className="bb-line-name">{it.name}</span>
                <div className="bb-line-qty">
                  <button
                    className="bb-step"
                    data-testid={`dec-${it.id}`}
                    onClick={() => dispatch({ type: "dec", id: it.id })}
                  >
                    −
                  </button>
                  <span data-testid={`qty-${it.id}`}>{it.qty}</span>
                  <button
                    className="bb-step"
                    data-testid={`inc-${it.id}`}
                    onClick={() => dispatch({ type: "inc", id: it.id })}
                  >
                    +
                  </button>
                </div>
                <span className="bb-line-sub">${it.price * it.qty}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="bb-summary">
          <span>
            Items: <strong data-testid="cart-count">{count}</strong>
          </span>
          <span>
            Total: $<strong data-testid="cart-total">{total}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
