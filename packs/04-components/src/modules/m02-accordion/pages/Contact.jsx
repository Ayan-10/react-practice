import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <section className="fq-page" data-testid="contact-page">
      <Link to="/" className="fq-back" data-testid="back-home">
        ← Back to FAQ
      </Link>
      <h1 className="fq-page-title">Contact us</h1>
      <p className="fq-page-sub">We usually reply within one business day.</p>
      <ul className="fq-contact">
        <li>Email: support@faqpage.example</li>
        <li>Phone: (555) 010-2048</li>
        <li>Hours: Mon–Fri, 9am–5pm</li>
      </ul>
    </section>
  );
}
