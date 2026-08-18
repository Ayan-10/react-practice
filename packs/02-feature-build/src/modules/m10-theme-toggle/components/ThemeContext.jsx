import { createContext, useContext, useState } from "react";

/**
 * FEATURE TO BUILD — Theme toggle via Context (no prop drilling).
 *
 * ReaderApp wraps its whole tree in <ThemeProvider>. A nested component (the
 * Navbar) calls useTheme() to read the current theme and to flip it. The app
 * root reflects the theme via data-theme={theme}.
 *
 * Your job (build this file):
 *   - ThemeProvider must hold real state: theme is "light" | "dark".
 *   - Expose a `toggle` that flips light <-> dark.
 *   - Provide { theme, toggle } through ThemeContext so ANY descendant (the
 *     Navbar, deep in the tree) can read it WITHOUT prop drilling.
 *   - useTheme() returns that context value.
 *
 * Right now this is a STUB: the provider does not actually provide working
 * state, so the theme is frozen at "light" and clicking the toggle does
 * nothing. The "app renders" + navigation tests pass; the toggle test fails.
 */

// TODO: this context should carry { theme, toggle }.
export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  // TODO: return useContext(ThemeContext) once the provider supplies a value.
  //
  // STUB: safe default so the app still renders. Theme is frozen at "light"
  // and toggle is a no-op, so the toggle feature test fails.
  const ctx = useContext(ThemeContext);
  return ctx ?? { theme: "light", toggle: () => {} };
}
