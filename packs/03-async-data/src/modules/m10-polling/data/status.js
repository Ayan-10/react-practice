// Local dataset for the StatusMonitor mini-app. Works fully offline.
// Kept here (not shared/api.js) so the module is self-contained.

// A few statuses the monitor cycles through when polling locally.
export const STATUSES = ["Operational", "Degraded", "Operational", "Maintenance"];

// Recent incident history shown on the second route.
export const HISTORY = [
  { id: "h1", when: "09:00", status: "Operational" },
  { id: "h2", when: "11:30", status: "Degraded" },
  { id: "h3", when: "12:10", status: "Operational" },
];

let tick = 0;

/**
 * Default async `load` for the Poller feature. Resolves the latest status
 * value (a string). Injectable in tests so polling is deterministic. Resolves
 * immediately (microtask) so the app renders offline without hanging.
 */
export default function loadStatus() {
  const value = STATUSES[tick % STATUSES.length];
  tick += 1;
  return Promise.resolve(value);
}

export { loadStatus };
