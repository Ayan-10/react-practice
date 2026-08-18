import { Link } from "react-router-dom";

// A second real route so navigation works — a short FAQ.
const FAQ = [
  { q: "Can I skip a step?", a: "Use Back/Next to move; nothing is submitted until Confirm." },
  { q: "Is my progress saved?", a: "The bar reflects how far along you are in the flow." },
];

export default function Help() {
  return (
    <section className="ow-page" data-testid="help-page">
      <Link to="/" className="ow-back" data-testid="back-home">
        ← Back to setup
      </Link>
      <h1 className="ow-page-title">Need a hand?</h1>
      <p className="ow-page-sub">{FAQ.length} common questions</p>
      <dl className="ow-faq">
        {FAQ.map((item) => (
          <div key={item.q} className="ow-faq-item">
            <dt className="ow-faq-q">{item.q}</dt>
            <dd className="ow-faq-a">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
