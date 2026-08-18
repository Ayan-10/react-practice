import { useEffect, useState } from "react";
import { fetchRate } from "../../../shared/api.js";
import { CURRENCIES } from "../data/currencies.js";

/**
 * FEATURE MODULE m02 — Currency Converter (👈 THIS is the file you build).
 *
 * Read PROMPT.md. Right now this component only renders the form controls.
 * You must IMPLEMENT the live conversion.
 *
 * Build a converter:
 *   - amount input (number)                 -> data-testid="amount"
 *   - "from" and "to" currency dropdowns    -> data-testid="from" / "to"
 *   - the converted amount updates whenever amount / from / to change
 *   - uses fetchRate(from, to) to get the exchange rate
 *
 * Show the converted result in an element with data-testid="result", formatted
 * to 2 decimal places. While a rate is loading, render data-testid="loading".
 *
 * REQUIRED data-testids: amount, from, to, result (and loading while fetching).
 *
 * fetchRate lives in ../../../shared/api.js and returns a Promise<number>
 * (offline fallback = 1). It is mocked in the tests with deterministic rates.
 */
export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchRate(from, to).then((r) => {
      if (!active) return;
      setRate(r);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [from, to]);

  const converted = rate === null ? 0 : amount * rate;

  return (
    <div className="tw-feature">
      <h2 className="tw-feature-title">Currency Converter</h2>

      <input
        className="tw-amount"
        data-testid="amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <div className="tw-select-row">
        <select
          className="tw-select"
          data-testid="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <span className="tw-arrow">→</span>
        <select
          className="tw-select"
          data-testid="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading && <p data-testid="loading">Loading…</p>}

      <p className="tw-result" data-testid="result">
        {converted.toFixed(2)}
      </p>
    </div>
  );
}
