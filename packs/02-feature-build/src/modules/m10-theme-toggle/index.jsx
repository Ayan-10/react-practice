import { createContext, useContext, useState } from "react";

/**
 * FEATURE MODULE m10 — Theme toggle via Context.
 *
 * Implement a ThemeContext so any nested component can read the theme and toggle
 * it, WITHOUT prop drilling. The Toolbar (a nested child) toggles the theme.
 *
 * Requirements:
 *   - ThemeProvider holds { theme: "light"|"dark", toggle }.
 *   - useTheme() returns that context.
 *   - Toggling flips light <-> dark.
 *   - The root element reflects the theme via data-testid="root" and
 *     data-theme={theme}.
 *
 * Required data-testids: root, toggle-btn, theme-label.
 */

// TODO: create the context
const ThemeContext = createContext(null);

// TODO: implement the provider
export function ThemeProvider({ children }) {
  // const [theme, setTheme] = useState("light");
  // const toggle = () => setTheme(t => t === "light" ? "dark" : "light");
  // return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
  return <>{children}</>; // replace
}

// TODO: implement the hook
export function useTheme() {
  return useContext(ThemeContext);
}

function Toolbar() {
  // TODO: read theme + toggle from context
  const ctx = useTheme();
  const theme = ctx?.theme ?? "light";
  return (
    <div>
      <span data-testid="theme-label">{theme}</span>
      <button className="btn" data-testid="toggle-btn" onClick={() => ctx?.toggle?.()}>
        Toggle theme
      </button>
    </div>
  );
}

export default function ThemeApp() {
  return (
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  );
}

function Root() {
  const ctx = useTheme();
  const theme = ctx?.theme ?? "light";
  return (
    <div
      data-testid="root"
      data-theme={theme}
      className="card"
      style={{
        background: theme === "dark" ? "#1a1a2e" : "#fff",
        color: theme === "dark" ? "#fff" : "#1a1a2e",
      }}
    >
      <h2>Theme demo</h2>
      <Toolbar />
    </div>
  );
}
