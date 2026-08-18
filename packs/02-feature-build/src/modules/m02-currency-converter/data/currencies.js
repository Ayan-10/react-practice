// Local, offline currency metadata for the TravelWallet mini-app.
// The actual exchange rates come from fetchRate() in ../../shared/api.js
// (Frankfurter API, with a 1:1 offline fallback). This file just keeps the
// list of supported currencies self-contained so the module works offline.

export const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY"];

// Friendly labels + symbols for display (not required by the feature tests,
// but they make the second page feel like a real wallet screen).
export const CURRENCY_META = {
  USD: { label: "US Dollar", symbol: "$" },
  EUR: { label: "Euro", symbol: "€" },
  GBP: { label: "British Pound", symbol: "£" },
  INR: { label: "Indian Rupee", symbol: "₹" },
  JPY: { label: "Japanese Yen", symbol: "¥" },
};
