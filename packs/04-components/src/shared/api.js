// Shared API helpers used across modules.
// Strategy: hit a REAL free public API when running the app (`npm run dev`),
// but always fall back to hardcoded local data if the network fails,
// so you can practice offline. In TESTS, `fetch` is mocked, so these
// functions just exercise your fetch/loading/error handling deterministically.

// ---- Hardcoded offline fallbacks -------------------------------------------

export const fallbackApartments = [
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

export const fallbackProducts = [
  { id: 1, title: "Wireless Mouse", price: 25, rating: 4.5, thumbnail: "https://picsum.photos/seed/p1/200" },
  { id: 2, title: "Mechanical Keyboard", price: 75, rating: 4.8, thumbnail: "https://picsum.photos/seed/p2/200" },
  { id: 3, title: "USB-C Hub", price: 40, rating: 4.1, thumbnail: "https://picsum.photos/seed/p3/200" },
  { id: 4, title: "Laptop Stand", price: 30, rating: 4.6, thumbnail: "https://picsum.photos/seed/p4/200" },
  { id: 5, title: "Webcam 1080p", price: 55, rating: 4.0, thumbnail: "https://picsum.photos/seed/p5/200" },
  { id: 6, title: "Noise-Cancel Headphones", price: 150, rating: 4.9, thumbnail: "https://picsum.photos/seed/p6/200" },
];

// ---- Fetch helpers ----------------------------------------------------------

/**
 * Fetch products from dummyjson, with offline fallback.
 * @param {{limit?: number, skip?: number}} opts
 */
export async function fetchProducts({ limit = 12, skip = 0 } = {}) {
  try {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,rating,thumbnail`
    );
    if (!res.ok) throw new Error("Bad response");
    const data = await res.json();
    return { products: data.products, total: data.total };
  } catch {
    return { products: fallbackProducts.slice(skip, skip + limit), total: fallbackProducts.length };
  }
}

/**
 * Search products by query (dummyjson search), with offline fallback.
 */
export async function searchProducts(query) {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&select=title,price,rating,thumbnail`
    );
    if (!res.ok) throw new Error("Bad response");
    const data = await res.json();
    return data.products;
  } catch {
    const q = query.toLowerCase();
    return fallbackProducts.filter((p) => p.title.toLowerCase().includes(q));
  }
}

/**
 * Currency conversion rate via Frankfurter (no API key). Offline fallback = 1:1.
 */
export async function fetchRate(from, to) {
  try {
    const res = await fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`);
    if (!res.ok) throw new Error("Bad response");
    const data = await res.json();
    return data.rates[to];
  } catch {
    return 1;
  }
}
