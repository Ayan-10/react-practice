import { useState } from "react";
import CityPicker from "../components/CityPicker.jsx";
import WeatherPanel from "../components/WeatherPanel.jsx";
import { CITIES } from "../data/weather.js";

export default function Home() {
  // The Home page owns which city is selected and passes it to the panel.
  const [city, setCity] = useState(CITIES[0].id);

  return (
    <section className="wd-page" data-testid="home-page">
      <h1 className="wd-page-title">Weather dashboard</h1>
      <p className="wd-page-sub">Pick a city to see its current weather.</p>

      <CityPicker city={city} onChange={setCity} />
      <WeatherPanel city={city} />
    </section>
  );
}
