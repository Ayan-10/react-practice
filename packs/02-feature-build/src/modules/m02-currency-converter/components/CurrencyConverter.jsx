import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { fetchRate } from "../../../shared/api.js";
import { CURRENCIES } from "../data/currencies.js";

// TODO: implement the live currency conversion (see PROMPT.md).
// Build a converter that:
//   - reads the amount input and the "from"/"to" currency dropdowns,
//   - calls fetchRate(from, to) (a Promise<number>) whenever amount/from/to
//     change, showing data-testid="loading" while the rate is loading,
//   - renders the converted amount (amount * rate) in data-testid="result",
//     formatted to 2 decimal places.
// REQUIRED data-testids: amount, from, to, result (and loading while fetching).
export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  // TODO: fetch the exchange rate for {from -> to} and compute the result.
  const converted = 0;

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

      {/* TODO: render data-testid="loading" while a rate is being fetched */}

      <p className="tw-result" data-testid="result">
        {converted.toFixed(2)}
      </p>
    </div>
  );
}
