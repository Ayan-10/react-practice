import { useState, useEffect } from "react";
import { fetchRate } from "../../shared/api.js";

/**
 * FEATURE MODULE m02 — Currency Converter.
 *
 * Implement a converter:
 *   - amount input (number)
 *   - "from" and "to" currency dropdowns
 *   - the converted amount updates whenever amount / from / to change
 *   - uses fetchRate(from, to) to get the exchange rate
 *
 * Show the converted result in an element with data-testid="result", formatted
 * to 2 decimal places. While the rate is loading show data-testid="loading".
 *
 * Required data-testids: amount, from, to, result.
 */
const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY"];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  // TODO: fetch the rate whenever `from` or `to` changes, store it in state,
  //       and compute converted = amount * rate.
  // TODO: handle loading state.

  const converted = 0; // <-- replace with amount * rate

  return (
    <div className="card" style={{ maxWidth: 420 }}>
      <h2>Currency Converter</h2>
      <input
        data-testid="amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        <select data-testid="from" value={from} onChange={(e) => setFrom(e.target.value)}>
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <span>→</span>
        <select data-testid="to" value={to} onChange={(e) => setTo(e.target.value)}>
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      {/* TODO: show loading + result */}
      <p data-testid="result">{converted.toFixed(2)}</p>
    </div>
  );
}
