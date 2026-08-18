import { Link } from "react-router-dom";
import { FACTS } from "../data/facts.js";

// A second real route so navigation works — a few prime-number facts.
export default function About() {
  return (
    <section className="ml-page" data-testid="about-page">
      <Link to="/" className="ml-back" data-testid="back-home">
        ← Back to the lab
      </Link>
      <h1 className="ml-page-title">About primes</h1>
      <p className="ml-page-sub">{FACTS.length} facts</p>
      <ul className="ml-fact-list">
        {FACTS.map((f) => (
          <li key={f.id} className="ml-fact-item">
            {f.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
