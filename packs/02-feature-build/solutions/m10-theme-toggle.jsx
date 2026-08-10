// SOLUTION — m10 Theme toggle via context.
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

function Toolbar() {
  const { theme, toggle } = useTheme();
  return (
    <div>
      <span data-testid="theme-label">{theme}</span>
      <button className="btn" data-testid="toggle-btn" onClick={toggle}>Toggle theme</button>
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
  const { theme } = useTheme();
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
