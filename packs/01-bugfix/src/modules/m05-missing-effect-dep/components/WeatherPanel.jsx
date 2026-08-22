import { useState, useEffect } from "react";
import { getWeather } from "../data/weather.js";

/**
 * 🐞 THIS IS THE FILE YOU NEED TO FIX.
 *
 * The panel "fetches" the weather for the currently selected `city` (passed in
 * from the Home page) and shows the temperature + condition.
 * 🐞 BUG: the effect that fetches weather has an EMPTY dependency array, so it only
 * runs once on mount. Pick a different city in the CityPicker and the panel
 * keeps showing the FIRST city's stale weather — it never refetches.
 *
 * // TODO (fix): add the selected city to the dependency array
 *
 * DO NOT change or remove any existing data-testid attributes:
 *   weather-panel, weather-temp, weather-condition
 */
export default function WeatherPanel({ city }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getWeather(city).then((data) => {
      if (active) {
        setWeather(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
    // 🐞 BUG: `city` is missing from the dependency array below, so this effect
    //         only runs once (on mount). When the user selects a different city,
    //         the effect does NOT re-run and the displayed weather stays stale.
    //
    // TODO (fix): add the selected city to the dependency array: `}, [city]);`
    //             so the weather refetches whenever the selected city changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wd-panel" data-testid="weather-panel">
      <p className="wd-panel-city">{city}</p>
      {loading || !weather ? (
        <p className="wd-panel-loading">Loading…</p>
      ) : (
        <>
          <p className="wd-temp" data-testid="weather-temp">
            {weather.temp}°C
          </p>
          <p className="wd-condition" data-testid="weather-condition">
            {weather.condition}
          </p>
          <div className="wd-panel-meta">
            <span>Humidity {weather.humidity}%</span>
            <span>Wind {weather.wind} km/h</span>
          </div>
        </>
      )}
    </div>
  );
}
