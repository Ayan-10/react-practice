import { Routes, Route, Link } from "react-router-dom";

import M01 from "./modules/m01-filter-chips/index.jsx";
import M02 from "./modules/m02-currency-converter/index.jsx";
import M03 from "./modules/m03-cart/index.jsx";
import M04 from "./modules/m04-schema-form/index.jsx";
import M05 from "./modules/m05-star-rating/index.jsx";
import M06 from "./modules/m06-todo/index.jsx";
import M07 from "./modules/m07-sort-control/index.jsx";
import M08 from "./modules/m08-search-filter/index.jsx";
import M09 from "./modules/m09-stepper/index.jsx";
import M10 from "./modules/m10-theme-toggle/index.jsx";

const MODULES = [
  { path: "m01", title: "m01 · Filter chips (amenities/country/rating, AND logic)", topic: "derived data, multi-select toggle", el: <M01 /> },
  { path: "m02", title: "m02 · Currency converter (live convert)", topic: "async, dropdowns, state", el: <M02 /> },
  { path: "m03", title: "m03 · Cart management (qty, total)", topic: "list state, derived totals", el: <M03 /> },
  { path: "m04", title: "m04 · Schema-driven form", topic: "dynamic controlled form, validation", el: <M04 /> },
  { path: "m05", title: "m05 · Star rating", topic: "hover/click, controlled value", el: <M05 /> },
  { path: "m06", title: "m06 · Todo list (add/toggle/delete/filter)", topic: "CRUD + filter tabs", el: <M06 /> },
  { path: "m07", title: "m07 · Sort control", topic: "sorting derived list", el: <M07 /> },
  { path: "m08", title: "m08 · Client-side search filter", topic: "text filter", el: <M08 /> },
  { path: "m09", title: "m09 · Multi-step form / stepper", topic: "step state, per-step validation", el: <M09 /> },
  { path: "m10", title: "m10 · Theme toggle via Context", topic: "context, persistence", el: <M10 /> },
];

function Menu() {
  return (
    <div className="app-shell">
      <h1>Pack 02 — Feature-Build Practice</h1>
      <p>Implement the missing feature so its tests pass. Read each module's <code>PROMPT.md</code>.</p>
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
              {m.el}
            </div>
          }
        />
      ))}
    </Routes>
  );
}
