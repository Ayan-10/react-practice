// Local dataset for the WeatherDash mini-app. Works fully offline.
// In a real app you'd hit a weather API; here it's local so the app always
// renders a believable forecast without any network.

export const CITIES = [
  { id: "london", name: "London" },
  { id: "tokyo", name: "Tokyo" },
  { id: "cairo", name: "Cairo" },
  { id: "sydney", name: "Sydney" },
  { id: "reykjavik", name: "Reykjavik" },
];

// Keyed by city id. Each entry is that city's current "weather".
const WEATHER = {
  london: { temp: 14, condition: "Cloudy", humidity: 78, wind: 12 },
  tokyo: { temp: 22, condition: "Sunny", humidity: 55, wind: 8 },
  cairo: { temp: 33, condition: "Hot", humidity: 20, wind: 15 },
  sydney: { temp: 26, condition: "Breezy", humidity: 60, wind: 24 },
  reykjavik: { temp: 4, condition: "Snow", humidity: 88, wind: 30 },
};

/**
 * Simulates an async weather lookup (like a real API) but resolves locally so
 * the app runs offline. Returns a Promise for the selected city's weather.
 */
export function getWeather(city) {
  const data = WEATHER[city] || {
    temp: 0,
    condition: "Unknown",
    humidity: 0,
    wind: 0,
  };
  // Return a promise to mirror real fetch timing.
  return Promise.resolve({ city, ...data });
}
