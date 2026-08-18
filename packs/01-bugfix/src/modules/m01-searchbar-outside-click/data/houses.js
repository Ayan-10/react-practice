// Local dataset for the HouseFinder mini-app. Works fully offline.
// In a real OA you'd fetch this; here it's local so the app always renders.

export const HOUSES = [
  {
    id: "h1",
    title: "Beach House Apartment",
    address: "123 Ocean Drive, Miami, USA",
    price: 220,
    beds: 3,
    baths: 2,
    rating: 5,
    image: "https://picsum.photos/seed/h1/400/250",
  },
  {
    id: "h2",
    title: "Mountain Cabin",
    address: "45 Pine Road, Manali, India",
    price: 120,
    beds: 2,
    baths: 1,
    rating: 4,
    image: "https://picsum.photos/seed/h2/400/250",
  },
  {
    id: "h3",
    title: "City Loft",
    address: "9 King Street, London, UK",
    price: 180,
    beds: 1,
    baths: 1,
    rating: 3,
    image: "https://picsum.photos/seed/h3/400/250",
  },
  {
    id: "h4",
    title: "Desert Villa",
    address: "77 Dune Avenue, Jaipur, India",
    price: 300,
    beds: 4,
    baths: 3,
    rating: 5,
    image: "https://picsum.photos/seed/h4/400/250",
  },
  {
    id: "h5",
    title: "Lakeside Bungalow",
    address: "12 Willow Lane, Toronto, Canada",
    price: 260,
    beds: 3,
    baths: 2,
    rating: 4,
    image: "https://picsum.photos/seed/h5/400/250",
  },
  {
    id: "h6",
    title: "Downtown Studio",
    address: "500 Market Street, San Francisco, USA",
    price: 210,
    beds: 1,
    baths: 1,
    rating: 4,
    image: "https://picsum.photos/seed/h6/400/250",
  },
];

/**
 * Simulates an async search call (like a real API) but resolves locally so the
 * app runs offline. Filters houses whose title or address matches the query.
 */
export function searchHouses(query) {
  const q = query.trim().toLowerCase();
  const matches = HOUSES.filter(
    (h) =>
      h.title.toLowerCase().includes(q) || h.address.toLowerCase().includes(q)
  );
  // Return a promise to mirror real fetch timing.
  return Promise.resolve(matches);
}
