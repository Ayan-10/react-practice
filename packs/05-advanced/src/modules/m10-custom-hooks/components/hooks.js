/**
 * THE FEATURE TO BUILD — m10 HookBox custom-hooks library.
 *
 * Implement and export these four hooks. `components/Demo.jsx` already consumes
 * them, and the tests import them directly. The current bodies are deliberately
 * NON-FUNCTIONAL stubs: the app still renders, but behaviour tests fail until
 * you implement them for real.
 *
 *   useToggle(initial=false) → [value, toggle, setValue]
 *     - toggle()          flips the boolean
 *     - toggle(true/false) sets it explicitly when a boolean is passed
 *     - setValue          the raw setter
 *
 *   usePrevious(value) → the value from the PREVIOUS render (undefined first).
 *     (useRef + useEffect: store AFTER render.)
 *
 *   useDebounce(value, delay) → a debounced copy of `value` that only updates
 *     `delay` ms after `value` stops changing (useState + useEffect + setTimeout
 *     with cleanup).
 *
 *   useLocalStorage(key, initial) → [value, setValue] that persists to
 *     window.localStorage (lazy init from storage, JSON serialise on write).
 */
import { useState } from "react";

// STUB: toggle is a no-op — value never changes.
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => {
    // TODO: flip, or set explicitly when a boolean is passed.
  };
  return [value, toggle, setValue];
}

// STUB: always returns undefined instead of the previous value.
export function usePrevious(value) {
  // TODO: use a ref updated in an effect so this returns the PREVIOUS value.
  return undefined;
}

// STUB: returns the value immediately with no delay (no debounce).
export function useDebounce(value, delay) {
  // TODO: debounce via useState + useEffect + setTimeout (+ cleanup).
  return value;
}

// STUB: plain state — does NOT persist to localStorage.
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(initial);
  // TODO: lazy-init from window.localStorage and write JSON on change.
  return [value, setValue];
}
