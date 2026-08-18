// Local dataset for the SneakerShop mini-app. Works fully offline.
// Kept here (not shared/api.js) so the module is self-contained.
//
//   s1 Air Pulse       — Nike     — $120
//   s2 Retro Court     — Adidas   — $95
//   s3 Cloud Runner    — Puma     — $110
//   s4 Street Classic  — Reebok   — $80
//   s5 Trail Blazer    — Nike     — $140
//   s6 Court Legend    — Adidas   — $105

export const SNEAKERS = [
  {
    id: "s1",
    title: "Air Pulse",
    price: 120,
    brand: "Nike",
    image: "https://picsum.photos/seed/s1/400/250",
  },
  {
    id: "s2",
    title: "Retro Court",
    price: 95,
    brand: "Adidas",
    image: "https://picsum.photos/seed/s2/400/250",
  },
  {
    id: "s3",
    title: "Cloud Runner",
    price: 110,
    brand: "Puma",
    image: "https://picsum.photos/seed/s3/400/250",
  },
  {
    id: "s4",
    title: "Street Classic",
    price: 80,
    brand: "Reebok",
    image: "https://picsum.photos/seed/s4/400/250",
  },
  {
    id: "s5",
    title: "Trail Blazer",
    price: 140,
    brand: "Nike",
    image: "https://picsum.photos/seed/s5/400/250",
  },
  {
    id: "s6",
    title: "Court Legend",
    price: 105,
    brand: "Adidas",
    image: "https://picsum.photos/seed/s6/400/250",
  },
];

/**
 * Default async loader for the ProductList feature. Resolves to the shape the
 * feature expects: { products, total }. Injectable in tests via the `load` prop.
 */
export default function loadSneakers() {
  return Promise.resolve({ products: SNEAKERS, total: SNEAKERS.length });
}

export { loadSneakers };
