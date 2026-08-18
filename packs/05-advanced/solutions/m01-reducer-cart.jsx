// SOLUTION — m01 BudgetBuddy cart with useReducer.
// Copy this over components/Cart.jsx to self-check.
import { useReducer } from "react";
import { PRODUCTS } from "../data/products.js";

export const initialState = { items: [] };

export function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const { product } = action;
      const existing = state.items.find((it) => it.id === product.id);
      if (existing) {
        return {
          items: state.items.map((it) =>
            it.id === product.id ? { ...it, qty: it.qty + 1 } : it
          ),
        };
      }
      return { items: [...state.items, { ...product, qty: 1 }] };
    }
    case "inc":
      return {
        items: state.items.map((it) =>
          it.id === action.id ? { ...it, qty: it.qty + 1 } : it
        ),
      };
    case "dec":
      return {
        items: state.items
          .map((it) =>
            it.id === action.id ? { ...it, qty: it.qty - 1 } : it
          )
          .filter((it) => it.qty > 0),
      };
    case "clear":
      return { items: [] };
    default:
      return state;
  }
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
