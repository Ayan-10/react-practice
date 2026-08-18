// Local event source for the LiveFeed mini-app. Works fully offline.
// In a real app this would be a WebSocket / SSE stream; here it's a tiny
// interval-driven pub/sub so the app runs offline and is deterministic.
//
// The key testability feature: we track how many active subscribers exist via
// `subscriberCount()`. A correctly-cleaned-up component drops back to 0 on
// unmount; a leaking one keeps its interval alive and stays > 0.

// Seed items shown before any live events arrive.
export const SEED_EVENTS = [
  { id: "e0", kind: "system", text: "LiveFeed connected.", at: "just now" },
];

// Pool of fake live events the ticker will emit over time.
const EVENT_POOL = [
  { kind: "like", text: "Ada liked your post" },
  { kind: "follow", text: "Grace started following you" },
  { kind: "comment", text: "Linus commented: nice work!" },
  { kind: "mention", text: "Margaret mentioned you in a thread" },
  { kind: "star", text: "Dennis starred your repo" },
  { kind: "share", text: "Barbara shared your update" },
];

let _seq = 0;
let _subscribers = 0;

/**
 * subscribe(onEvent, intervalMs)
 *
 * Starts an interval that pushes a new fake live event to `onEvent` every
 * `intervalMs`. Returns an `unsubscribe` function that MUST be called to stop
 * the interval and release the subscription. Each active subscribe increments
 * an internal counter; the returned unsubscribe decrements it exactly once.
 */
export function subscribe(onEvent, intervalMs = 1000) {
  _subscribers += 1;
  let stopped = false;

  const timer = setInterval(() => {
    const base = EVENT_POOL[_seq % EVENT_POOL.length];
    _seq += 1;
    onEvent({ id: `e${_seq}`, kind: base.kind, text: base.text, at: "just now" });
  }, intervalMs);

  return function unsubscribe() {
    if (stopped) return; // idempotent — never double-decrement
    stopped = true;
    clearInterval(timer);
    _subscribers -= 1;
  };
}

/** Number of active (not-yet-unsubscribed) subscriptions. Tests assert on this. */
export function subscriberCount() {
  return _subscribers;
}

/** Test/util helper: reset counters between runs. */
export function __resetFeed() {
  _seq = 0;
  _subscribers = 0;
}
