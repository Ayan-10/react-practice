import { useState } from "react";
import SignupForm from "../components/SignupForm.jsx";
import { SUBSCRIBERS } from "../data/subscribers.js";

export default function Home() {
  // The subscribers list lives here and is passed down to the signup form.
  // A successful signup prepends the new record so it shows at the top.
  const [subscribers, setSubscribers] = useState(SUBSCRIBERS);

  function handleSubscribe(record) {
    setSubscribers((prev) => [record, ...prev]);
  }

  return (
    <div className="ns-home" data-testid="home-page">
      <section className="ns-hero">
        <h1 className="ns-hero-title">The Dispatch</h1>
        <p className="ns-hero-sub">
          Sharp weekly reads on product, design &amp; engineering — straight to
          your inbox.
        </p>
      </section>

      <SignupForm subscribers={subscribers} onSubscribe={handleSubscribe} />
    </div>
  );
}
