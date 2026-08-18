// SOLUTION — m10 HookBox custom-hooks library.
// Copy this over components/hooks.js to self-check.
import { useState, useEffect, useRef, useCallback } from "react";

export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback((next) => {
    setValue((prev) => (typeof next === "boolean" ? next : !prev));
  }, []);
  return [value, toggle, setValue];
}

export function usePrevious(value) {
  const ref = useRef(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore write errors (e.g. storage disabled) */
    }
  }, [key, value]);

  return [value, setValue];
}
