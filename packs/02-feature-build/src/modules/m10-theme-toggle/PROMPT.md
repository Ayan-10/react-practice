# Feature: Theme Toggle via Context

**Time box:** ~15 min · **Difficulty:** core · **Topic:** Context API, no prop drilling

## Task
Provide a `ThemeContext` with `{ theme, toggle }`. A nested `Toolbar` reads the
context and toggles light↔dark. The root reflects the theme via `data-theme`.

## Required data-testids
`root` (with `data-theme={theme}`), `toggle-btn`, `theme-label`.

## Run
```bash
npm test -- m10
```

## Hints
- `const [theme, setTheme] = useState("light")` in the provider.
- `toggle = () => setTheme(t => t === "light" ? "dark" : "light")`.
- `useTheme = () => useContext(ThemeContext)`.
