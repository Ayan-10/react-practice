import { createContext } from "react";

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
  // TODO: hold theme state ("light" | "dark") and a toggle that flips it,
  // then provide { theme, toggle } through ThemeContext.Provider so
  // descendants (like the Navbar) can read/flip it without prop drilling.
  return <>{children}</>;
}

export function useTheme() {
  // TODO: return useContext(ThemeContext) once the provider actually
  // supplies a value above.
  //
  // STUB: safe default so the app still renders. Theme is frozen at "light"
  // and toggle is a no-op, so the toggle feature test fails.
  return { theme: "light", toggle: () => {} };
}
