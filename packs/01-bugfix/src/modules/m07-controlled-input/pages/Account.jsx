import { Link } from "react-router-dom";
import { INITIAL_PROFILE, TIMEZONES } from "../data/profile.js";

// A second route: a static read-only account summary. Navigating here unmounts
// the Profile page. Purely informational.
export default function Account() {
  return (
    <section className="ps-page" data-testid="account-page">
      <Link to="/" className="ps-back">← Back to profile</Link>
      <h1 className="ps-page-title">Account</h1>
      <p className="ps-page-sub">Read-only account details.</p>

      <dl className="ps-account">
        <div className="ps-account-row">
          <dt>Signed in as</dt>
          <dd>{INITIAL_PROFILE.email}</dd>
        </div>
        <div className="ps-account-row">
          <dt>Plan</dt>
          <dd>Pro</dd>
        </div>
        <div className="ps-account-row">
          <dt>Timezone</dt>
          <dd>{TIMEZONES[0]}</dd>
        </div>
      </dl>
    </section>
  );
}
