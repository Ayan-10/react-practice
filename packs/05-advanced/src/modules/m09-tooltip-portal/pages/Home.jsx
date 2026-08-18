import Tooltip from "../components/Tooltip.jsx";
import { HINTS } from "../data/hints.js";

export default function Home() {
  const hint = HINTS[0];
  return (
    <section className="hh-page" data-testid="home-page">
      <h1 className="hh-page-title">Account settings</h1>
      <p className="hh-page-sub">Hover or focus a field label to see its hint.</p>

      <form className="hh-form" onSubmit={(e) => e.preventDefault()}>
        <label className="hh-field">
          <Tooltip label={hint.label}>
            <span className="hh-label-text">{hint.trigger}</span>
          </Tooltip>
          <input className="hh-input" placeholder={hint.trigger} />
        </label>
      </form>
    </section>
  );
}
