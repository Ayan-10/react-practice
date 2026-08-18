import { Link } from "react-router-dom";
import CountryCard from "../components/CountryCard.jsx";
import { COUNTRIES } from "../data/countries.js";

// A second real route so navigation works — a couple of highlighted countries.
// Proves the app is a full mini-app, not a single screen.
const FEATURED = COUNTRIES.slice(0, 2);

export default function About() {
  return (
    <section className="cs-page" data-testid="about-page">
      <Link to="/" className="cs-back" data-testid="back-home">
        ← Back to countries
      </Link>
      <h1 className="cs-page-title">About CountryStats</h1>
      <p className="cs-page-sub">
        A tiny demo that reads a local dataset via a reusable useFetch hook.
      </p>
      <div className="cs-grid">
        {FEATURED.map((country) => (
          <CountryCard key={country.id} country={country} />
        ))}
      </div>
    </section>
  );
}
