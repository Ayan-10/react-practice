// Local photo dataset for the PhotoWall mini-app.
export const PHOTOS = [
  { id: 1, title: "Golden Hour", url: "https://media.example.com/photos/golden-hour.jpg" },
  { id: 2, title: "City Lights", url: "https://media.example.com/photos/city-lights.jpg" },
  { id: 3, title: "Mountain Peak", url: "https://media.example.com/photos/mountain-peak.jpg" },
  { id: 4, title: "Ocean Wave", url: "https://media.example.com/photos/ocean-wave.jpg" },
  { id: 5, title: "Desert Dune", url: "https://media.example.com/photos/desert-dune.jpg" },
  { id: 6, title: "Forest Trail", url: "https://media.example.com/photos/forest-trail.jpg" },
];

// Async pager mirroring a network call. Keeps the `products` field name so the
// infinite-scroll feature contract stays identical to the API version.
export async function loadPhotos({ limit, skip }) {
  return Promise.resolve({
    products: PHOTOS.slice(skip, skip + limit),
    total: PHOTOS.length,
  });
}

export default loadPhotos;
