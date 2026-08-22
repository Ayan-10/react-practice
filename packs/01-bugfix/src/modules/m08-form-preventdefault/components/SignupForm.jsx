import { useState } from "react";
import { makeSubscriber, isValidEmail } from "../data/subscribers.js";

/**
 * 🐞 THIS IS THE FILE YOU NEED TO FIX.
 *
 * The signup form lets a visitor subscribe to the newsletter. When they type an
 * email and press "Subscribe", their address is added to the "Newest
 * subscribers" list and a success message shows — all in-place.
 *
 * 🐞 BUG: the submit handler never calls e.preventDefault(). In a real browser
 * the native form submit fires and the page RELOADS, throwing away the new
 * state. The handler must call e.preventDefault() FIRST so the JS owns the
 * submit and the page never reloads.
 *
 * // TODO (fix): call e.preventDefault() at the top of the submit handler.
 *
 * Everything else in this project already works — only edit this component.
 *
 * DO NOT change or remove any existing data-testid attributes:
 *   signup-form, email-input, subscribe-btn, success-msg, subscriber-list,
 *   subscriber-email
 */
export default function SignupForm({ subscribers, onSubscribe }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [added, setAdded] = useState(null);

  function handleSubmit(e) {
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
