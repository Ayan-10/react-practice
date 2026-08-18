// CityExplorer data + default loader.
export const CITIES = [
  { id: 1, name: "Paris", description: "The City of Light on the Seine." },
  { id: 2, name: "Tokyo", description: "A neon metropolis of old and new." },
  { id: 3, name: "Cairo", description: "Ancient wonders beside the Nile." },
  { id: 4, name: "Lima", description: "Coastal capital with Andean roots." },
];

// Default loader — resolves fast and deterministically so the app renders fine.
// The race delays (id 1 slow, id 2 fast) come from the injected mock in the test.
export async function loadCity(id) {
  const city = CITIES.find((c) => c.id === id);
  return Promise.resolve(city ? city.description : `Details for city ${id}`);
}
