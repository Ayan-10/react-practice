// SOLUTION — m05 WeatherDash WeatherPanel refetch-on-city-change.
// This is the FIXED version of components/WeatherPanel.jsx. Attempt it yourself
// first, then compare. To self-check: copy this over components/WeatherPanel.jsx.
//
// Fix: add `city` to the dependency array so the effect re-runs (and refetches)
// whenever the selected city changes.
import { useState, useEffect } from "react";
import { getWeather } from "../data/weather.js";

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
  }, [city]); // <-- fixed: refetch whenever the selected city changes

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
