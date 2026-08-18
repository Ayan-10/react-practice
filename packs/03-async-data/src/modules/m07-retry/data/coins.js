// Local dataset for the CryptoTicker mini-app. Works fully offline.
// Kept here (not shared/api.js) so the module is self-contained.
//
//   c1 Bitcoin    (BTC)
//   c2 Ethereum   (ETH)
//   c3 Solana     (SOL)
//   c4 Cardano    (ADA)
//   c5 Polkadot   (DOT)
//   c6 Chainlink  (LINK)

export const COINS = [
  { id: "c1", title: "Bitcoin", symbol: "BTC", price: 64000 },
  { id: "c2", title: "Ethereum", symbol: "ETH", price: 3400 },
  { id: "c3", title: "Solana", symbol: "SOL", price: 145 },
  { id: "c4", title: "Cardano", symbol: "ADA", price: 0.62 },
  { id: "c5", title: "Polkadot", symbol: "DOT", price: 7.1 },
  { id: "c6", title: "Chainlink", symbol: "LINK", price: 18.4 },
];

/**
 * Default async loader for the RetryList feature. Resolves to the shape the
 * feature expects: { products, total }. Injectable in tests via the `load`
 * prop so tests can force success/failure. Fully offline.
 */
export default function loadCoins() {
  return Promise.resolve({ products: COINS, total: COINS.length });
}

export { loadCoins };
