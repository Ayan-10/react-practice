// SOLUTION — m08 NewsletterSignup. The fix for components/SignupForm.jsx:
// call e.preventDefault() as the FIRST line of the submit handler so the native
// submit (full-page reload) never fires and the JS owns the submit.
// Copy this file over components/SignupForm.jsx to self-check.
import { useState } from "react";
import { makeSubscriber, isValidEmail } from "../data/subscribers.js";

export default function SignupForm({ subscribers, onSubscribe }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [added, setAdded] = useState(null);

  function handleSubmit(e) {
    e.preventDefault(); // ✅ FIX: stop the native submit / page reload.

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const record = makeSubscriber(email);
    onSubscribe(record);
    setAdded(record.email);
    setError("");
    setEmail("");
  }

  return (
    <div className="ns-signup">
      <h2 className="ns-signup-title">Get the weekly Dispatch</h2>
      <p className="ns-signup-sub">
        One email a week. No spam. Unsubscribe anytime.
      </p>

      <form
        data-testid="signup-form"
        className="ns-form"
        onSubmit={handleSubmit}
      >
        <input
          data-testid="email-input"
          name="email"
          type="email"
          className="ns-input"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="ns-btn"
          data-testid="subscribe-btn"
        >
          Subscribe
        </button>
      </form>

      {error && <p className="ns-error">{error}</p>}

      {added && (
        <p data-testid="success-msg" className="ns-success">
          🎉 Thanks! {added} is now subscribed.
        </p>
      )}

      <h3 className="ns-list-title">Newest subscribers</h3>
      <ul data-testid="subscriber-list" className="ns-list">
        {subscribers.map((s) => (
          <li key={s.id} data-testid="subscriber-email" className="ns-list-row">
            <span className="ns-list-email">{s.email}</span>
            <span className="ns-list-plan">{s.plan}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
