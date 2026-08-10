// SOLUTION — m02 Currency converter.
import { useState, useEffect } from "react";
import { fetchRate } from "../../shared/api.js";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY"];

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
          {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <span>→</span>
        <select data-testid="to" value={to} onChange={(e) => setTo(e.target.value)}>
          {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      {loading && <p data-testid="loading">Loading…</p>}
      <p data-testid="result">{converted.toFixed(2)}</p>
    </div>
  );
}
