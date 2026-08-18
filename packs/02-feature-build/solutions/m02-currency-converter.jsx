// SOLUTION — m02 TravelWallet Currency converter.
// Copy this over components/CurrencyConverter.jsx to self-check.
//
// (Paths are relative to components/, i.e. where this file is copied to:
//   ../../../shared/api.js  and  ../data/currencies.js)
import { useState, useEffect } from "react";
import { fetchRate } from "../../../shared/api.js";
import { CURRENCIES } from "../data/currencies.js";

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

  const converted = rate == null ? 0 : amount * rate;

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

      {loading && (
        <p className="tw-loading" data-testid="loading">
          Loading…
        </p>
      )}

      <p className="tw-result" data-testid="result">
        {converted.toFixed(2)}
      </p>
    </div>
  );
}
