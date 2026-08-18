import { Link } from "react-router-dom";
import { CURRENCIES, CURRENCY_META } from "../data/currencies.js";

// A second real route so navigation works. A static reference card of the
// currencies TravelWallet supports. Proves the app is a full mini-app, not a
// single screen. (Rates here are illustrative; the live converter uses the API.)
export default function Rates() {
  return (
    <section className="tw-page" data-testid="rates-page">
      <Link to="/" className="tw-back" data-testid="back-home">
        ← Back to converter
      </Link>
      <h1 className="tw-page-title">Supported currencies</h1>
      <p className="tw-page-sub">{CURRENCIES.length} currencies</p>
      <ul className="tw-currency-list">
        {CURRENCIES.map((code) => {
          const meta = CURRENCY_META[code] || { label: code, symbol: "" };
          return (
            <li key={code} className="tw-currency-item">
              <span className="tw-currency-symbol">{meta.symbol}</span>
              <span className="tw-currency-code">{code}</span>
              <span className="tw-currency-label">{meta.label}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
