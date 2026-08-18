// Local data for the CheckoutFlow mini-app. Works fully offline.
// The wizard walks the shopper through three named steps; the cart summary
// is just flavour shown on the pages so the app feels like a real checkout.

/** Ordered labels for the 3-step checkout wizard. */
export const STEPS = ["Shipping", "Payment", "Review"];

/** A tiny cart summary used for flavour on the pages. */
export const CART_SUMMARY = {
  items: 3,
  total: 148,
};
