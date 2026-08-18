// Local dataset for the GroceryCart mini-app. Works fully offline.
// Kept here so the module is fully self-contained (no reliance on shared/api.js).
//
//   id1 Avocados        — $25
//   id2 Wild Salmon     — $75
//   id3 Olive Oil       — $40
//   id4 Sourdough Loaf  — $30
//   id5 Aged Cheddar    — $55
//   id6 Truffle Butter  — $150

export const PRODUCTS = [
  { id: 1, title: "Avocados (bag of 6)", price: 25, unit: "bag", image: "https://picsum.photos/seed/g1/300/200" },
  { id: 2, title: "Wild Salmon Fillet", price: 75, unit: "lb", image: "https://picsum.photos/seed/g2/300/200" },
  { id: 3, title: "Cold-Pressed Olive Oil", price: 40, unit: "bottle", image: "https://picsum.photos/seed/g3/300/200" },
  { id: 4, title: "Sourdough Loaf", price: 30, unit: "loaf", image: "https://picsum.photos/seed/g4/300/200" },
  { id: 5, title: "Aged Cheddar", price: 55, unit: "block", image: "https://picsum.photos/seed/g5/300/200" },
  { id: 6, title: "Truffle Butter", price: 150, unit: "jar", image: "https://picsum.photos/seed/g6/300/200" },
];
