// Local dataset for the ShopFilters mini-app. Works fully offline.
// In a real store you'd fetch this; here it's local so the app always renders.

export const PRODUCTS = [
  {
    id: "p1",
    name: "Wireless Headphones",
    category: "electronics",
    price: 120,
    rating: 5,
    image: "https://picsum.photos/seed/p1/400/250",
  },
  {
    id: "p2",
    name: "Mechanical Keyboard",
    category: "electronics",
    price: 90,
    rating: 4,
    image: "https://picsum.photos/seed/p2/400/250",
  },
  {
    id: "p3",
    name: "The Pragmatic Programmer",
    category: "books",
    price: 35,
    rating: 5,
    image: "https://picsum.photos/seed/p3/400/250",
  },
  {
    id: "p4",
    name: "Clean Code",
    category: "books",
    price: 28,
    rating: 4,
    image: "https://picsum.photos/seed/p4/400/250",
  },
  {
    id: "p5",
    name: "Ceramic Coffee Mug",
    category: "home",
    price: 15,
    rating: 4,
    image: "https://picsum.photos/seed/p5/400/250",
  },
  {
    id: "p6",
    name: "Linen Throw Blanket",
    category: "home",
    price: 60,
    rating: 5,
    image: "https://picsum.photos/seed/p6/400/250",
  },
];

// Categories available in the filters panel (plus an "all" pass-through).
export const CATEGORIES = ["all", "electronics", "books", "home"];

/**
 * Pure helper: filter products by category + minimum price. Kept local so the
 * app (and its filters) works entirely offline. Returns a NEW array.
 */
export function filterProducts(products, category, minPrice) {
  return products.filter(
    (p) =>
      (category === "all" || p.category === category) && p.price >= minPrice
  );
}
