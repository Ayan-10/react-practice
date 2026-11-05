import { useEffect, useState } from "react";

/**
 * Returns `value`, but updated only after it stops changing for `delay` ms.
 * Resets its own timer on every change and clears it on unmount.
 */
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}
