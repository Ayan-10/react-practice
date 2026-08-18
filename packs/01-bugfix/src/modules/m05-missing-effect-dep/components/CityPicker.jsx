import { CITIES } from "../data/weather.js";

/**
 * Lets the user pick which city's weather to view. Controlled by the Home page,
 * which owns the selected-city state and passes it down to the WeatherPanel.
 */
export default function CityPicker({ city, onChange }) {
  return (
    <div className="wd-picker">
      <label className="wd-picker-label" htmlFor="wd-city-select">
        City
      </label>
      <select
        id="wd-city-select"
        data-testid="city-select"
        className="wd-select"
        value={city}
        onChange={(e) => onChange(e.target.value)}
      >
        {CITIES.map((c) => (
          <option key={c.id} value={c.id} data-testid="city-option">
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
