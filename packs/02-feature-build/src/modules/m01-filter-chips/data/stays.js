// Local dataset for the StayFinder mini-app. Works fully offline.
// These are the same 4 apartments used across the pack, kept here so the
// module is fully self-contained (no reliance on shared/api.js).
//
//   a1 Beach House  — Miami, USA    — rating 5 — [WiFi, Pool, Parking]
//   a2 Mountain Cabin — Manali, India — rating 4 — [WiFi, Fireplace]
//   a3 City Loft    — London, UK     — rating 3 — [WiFi, Gym, Pool]
//   a4 Desert Villa — Jaipur, India  — rating 5 — [Pool, Parking, AC]

export const STAYS = [
  {
    _id: "a1",
    title: "Beach House Apartment",
    address: "123 Ocean Drive, Miami, USA",
    price: 220,
    averageRating: 5,
    amenities: ["WiFi", "Pool", "Parking"],
    image: "https://picsum.photos/seed/a1/400/250",
  },
  {
    _id: "a2",
    title: "Mountain Cabin",
    address: "45 Pine Road, Manali, India",
    price: 120,
    averageRating: 4,
    amenities: ["WiFi", "Fireplace"],
    image: "https://picsum.photos/seed/a2/400/250",
  },
  {
    _id: "a3",
    title: "City Loft",
    address: "9 King Street, London, UK",
    price: 180,
    averageRating: 3,
    amenities: ["WiFi", "Gym", "Pool"],
    image: "https://picsum.photos/seed/a3/400/250",
  },
  {
    _id: "a4",
    title: "Desert Villa",
    address: "77 Dune Avenue, Jaipur, India",
    price: 300,
    averageRating: 5,
    amenities: ["Pool", "Parking", "AC"],
    image: "https://picsum.photos/seed/a4/400/250",
  },
];

/** Country = the last comma-separated part of the address. */
export function getCountry(address) {
  return address.split(",").pop().trim();
}

/** All unique amenities across the given stays, in first-seen order. */
export function uniqueAmenities(stays = STAYS) {
  return [...new Set(stays.flatMap((s) => s.amenities))];
}

/** All unique countries across the given stays, in first-seen order. */
export function uniqueCountries(stays = STAYS) {
  return [...new Set(stays.map((s) => getCountry(s.address)))];
}

/** Which of [3,4,5] are relevant (some stay has averageRating >= n). */
export function relevantRatings(stays = STAYS) {
  return [3, 4, 5].filter((n) => stays.some((s) => s.averageRating >= n));
}
