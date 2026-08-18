import { Link } from "react-router-dom";
import { DEFAULT_TABS } from "../data/tabs.ts";

// A second real route so navigation works. Lists the same sections as a menu.
export default function Account() {
  return (
    <section className="se-page" data-testid="account-page">
      <Link to="/" className="se-back" data-testid="back-home">
        ← Back to settings
      </Link>
      <h1 className="se-page-title">Account</h1>
      <p className="se-page-sub">Manage your account sections</p>
      <ul className="se-list">
        {DEFAULT_TABS.map((t) => (
          <li key={t.id} className="se-list-item">
            {t.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
