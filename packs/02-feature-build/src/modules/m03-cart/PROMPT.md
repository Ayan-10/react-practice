# GroceryCart — Build the cart management

**Time box:** ~25 min · **Difficulty:** core · **Topic:** list state, quantity updates, derived totals

## The app
You've been handed **GroceryCart**, a small but complete grocery shopping app:

```
m03-cart/
├── App.jsx                    app root (layout + routes)
├── components/
│   ├── Navbar.jsx             top bar (brand + nav links)
│   ├── CartManager.jsx  👈     THE FILE YOU BUILD
│   ├── ProductCard.jsx
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx              shop page (renders CartManager)
│   └── Orders.jsx           second route (past orders)
├── data/products.js         local dataset (offline)
└── styles.css
```

Run the pack (`npm run dev`) and open **m03** to see it live: a navbar, a grid
of product cards, and an Orders page. Everything works — **except the cart is
inert**. Clicking **Add to cart** does nothing, the cart stays empty, and the
totals are stuck at 0.

## Your task
Build **only** `components/CartManager.jsx` so the shop page gains a working
cart with live totals. Cart state is **frontend only** (no API calls).

1. **Add**: clicking **Add to cart** on a product adds it to the cart; if it's
   already present, **increment** its quantity instead of duplicating the line.
2. **Inc / Dec**: change a line's quantity from within the cart.
3. Decreasing a line to **0** removes it from the cart.
4. **Totals** update in real time:
   - `total-count` = sum of all quantities.
   - `total-price` = sum of `price * qty`, shown to **2 decimals**.

## Required data-testids (mandatory for grading)
- Add-to-cart button (already on `ProductCard`): `add-<id>`
- A cart line: `cart-line-<id>`
- Quantity text for a line: `qty-<id>`
- Increment / decrement buttons: `inc-<id>` / `dec-<id>`
- Total item count: `total-count`
- Total price (2 decimals): `total-price`
- Keep the list container id: `product-list`

## How to run
```bash
npm test -- m03
```
Tests mount the **whole app** and drive it like a user. The app renders on the
stub; the feature tests FAIL first — make them pass.

## Hints (peek only if stuck)
- Keep the cart as an array of `{ ...product, qty }` and update **immutably**.
- Add: if `cart.find(l => l.id === p.id)` → `map` + `qty + 1`; else
  `[...cart, { ...p, qty: 1 }]`.
- Dec: `map` the matching line to `qty - 1`, then `filter(l => l.qty > 0)` so a
  line at 0 disappears.
- Totals: `cart.reduce((s, l) => s + l.qty, 0)` and
  `cart.reduce((s, l) => s + l.price * l.qty, 0)`.
