// Local dataset for the RateWidget mini-app. Works fully offline.
// Kept here (not shared) so the module is self-contained.
//
//   r1 "Great product"   — 5 stars
//   r2 "Solid, would buy" — 4 stars
//   r3 "It's okay"        — 3 stars
export type Review = {
  id: string;
  title: string;
  stars: number;
};

export const REVIEWS: Review[] = [
  { id: "r1", title: "Great product", stars: 5 },
  { id: "r2", title: "Solid, would buy", stars: 4 },
  { id: "r3", title: "It's okay", stars: 3 },
];
