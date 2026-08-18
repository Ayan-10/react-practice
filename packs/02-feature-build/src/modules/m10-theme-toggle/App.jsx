import { Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./components/ThemeContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Library from "./pages/Library.jsx";
import "./styles.css";

/**
 * ReaderApp — a small but complete reading app (navbar + home + a library
 * route). Everything works EXCEPT the one feature you must BUILD in
 * components/ThemeContext.jsx: the light/dark theme toggle via Context, so a
 * nested component (the Navbar) can flip the theme without prop drilling.
 *
 * NOTE: This app does not render its own <Router>. It expects to be mounted
 * inside a router (the pack's dev shell provides one; tests use MemoryRouter).
 * That's why routes below are RELATIVE (no leading slash) — so the same app
 * works whether it's at "/" (tests) or nested under "/m10" (dev menu).
 *
 * The whole app is wrapped in <ThemeProvider> so the entire tree (navbar +
 * pages) can read the theme. The themed ROOT is the <div data-testid="reader-app">
 * which reflects data-theme={theme}.
 */
function Shell() {
  const { theme } = useTheme();
  return (
    <div className="ra-app" data-testid="reader-app" data-theme={theme}>
      <Navbar />
      <main className="ra-main">
        <Routes>
          <Route index element={<Home />} />
          <Route path="library" element={<Library />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Shell />
    </ThemeProvider>
  );
}
