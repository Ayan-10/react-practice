import { Link } from "react-router-dom";
import { FAQ } from "../data/steps.js";

// A second real route so navigation works — frequently asked questions.
export default function Faq() {
  return (
    <section className="af-page" data-testid="faq-page">
      <Link to="/" className="af-back" data-testid="back-home">
        ← Back to application
      </Link>
      <h1 className="af-page-title">FAQ</h1>
      <p className="af-page-sub">Answers to common questions.</p>
      <ul className="af-faq-list">
        {FAQ.map((item, i) => (
          <li key={i} className="af-faq-item">
            <p className="af-faq-q">{item.q}</p>
            <p className="af-faq-a">{item.a}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
