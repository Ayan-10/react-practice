import { Routes, Route, Link, MemoryRouter } from "react-router-dom";

// Each module exports a default React component. Register it here so it
// shows up in the dev menu and gets a route. Tests import modules directly,
// so this menu is only for manual practice via `npm run dev`.
import M01 from "./modules/m01-searchbar-outside-click/index.jsx";
import M02 from "./modules/m02-stale-closure-interval/index.jsx";
import M03 from "./modules/m03-effect-infinite-loop/index.jsx";
import M04 from "./modules/m04-state-mutation/index.jsx";
import M05 from "./modules/m05-missing-effect-dep/index.jsx";
import M06 from "./modules/m06-list-key-bug/index.jsx";
import M07 from "./modules/m07-controlled-input/index.jsx";
import M08 from "./modules/m08-form-preventdefault/index.jsx";
import M09 from "./modules/m09-memory-leak/index.jsx";
import M10 from "./modules/m10-derived-state/index.jsx";

const MODULES = [
  { path: "m01", title: "m01 · SearchBar closes on outside click", topic: "refs, event listeners, effect cleanup, router", el: <M01 /> },
  { path: "m02", title: "m02 · FocusTimer stale closure in setInterval", topic: "functional updates / refs", el: <M02 /> },
  { path: "m03", title: "m03 · ShopFilters useEffect infinite loop", topic: "object deps / memoization", el: <M03 /> },
  { path: "m04", title: "m04 · PlaylistBuilder — direct state mutation (no re-render)", topic: "immutable updates", el: <M04 /> },
  { path: "m05", title: "m05 · WeatherDash — missing effect dependency", topic: "dependency arrays / effect re-runs", el: <M05 /> },
  { path: "m06", title: "m06 · TaskBoard — checkbox leaks (index as key)", topic: "keys / list identity", el: <M06 /> },
  { path: "m07", title: "m07 · ProfileSettings — controlled/uncontrolled input", topic: "controlled inputs", el: <M07 /> },
  { path: "m08", title: "m08 · NewsletterSignup — form reloads page on submit", topic: "preventDefault", el: <M08 /> },
  { path: "m09", title: "m09 · LiveFeed — subscription memory leak", topic: "effect cleanup", el: <M09 /> },
  { path: "m10", title: "m10 · ExpenseTracker — derived state stored in state", topic: "derive during render", el: <M10 /> },
];

function Menu() {
  return (
    <div className="app-shell">
      <h1>Pack 01 — Bug-Fix Practice</h1>
      <p>Pick a module. Read its <code>PROMPT.md</code>, run its test, make it pass.</p>
      <ul className="module-menu">
        {MODULES.map((m) => (
          <li key={m.path}>
            <Link to={m.path}>
              {m.title}
              <small>{m.topic}</small>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      {MODULES.map((m) => (
        <Route
          key={m.path}
          path={`${m.path}/*`}
          element={
            <div className="app-shell">
              <Link className="back-link" to="/">← All modules</Link>
              {/* Each module is a self-contained mini-app. It renders its own
                  <Routes> and uses absolute links (to="/", to="/saved", …), so
                  we give it its own MemoryRouter to keep that navigation
                  internal — it never collides with the pack's own URL. */}
              <MemoryRouter initialEntries={["/"]}>{m.el}</MemoryRouter>
            </div>
          }
        />
      ))}
    </Routes>
  );
}
