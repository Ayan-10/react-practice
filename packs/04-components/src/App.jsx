import { BrowserRouter } from "react-router-dom";

import M01 from "./modules/m01-tabs/index.jsx";
import M02 from "./modules/m02-accordion/index.jsx";
import M03 from "./modules/m03-modal/index.jsx";
import M04 from "./modules/m04-autocomplete/index.jsx";
import M05 from "./modules/m05-data-table/index.jsx";
import M06 from "./modules/m06-stopwatch/index.jsx";
import M07 from "./modules/m07-progress-stepper/index.jsx";
import M08 from "./modules/m08-pagination-component/index.jsx";
import M09 from "./modules/m09-nested-comments/index.jsx";
import M10 from "./modules/m10-tabs-ts/index.tsx";
import M11 from "./modules/m11-use-fetch-ts/index.tsx";
import M12 from "./modules/m12-star-rating-ts/index.tsx";

const MODULES = [
  { path: "m01", title: "m01 · Tabs", topic: "active tab state, panels", el: <M01 /> },
  { path: "m02", title: "m02 · Accordion", topic: "single/multi open", el: <M02 /> },
  { path: "m03", title: "m03 · Modal / dialog", topic: "open/close, Esc, backdrop", el: <M03 /> },
  { path: "m04", title: "m04 · Autocomplete", topic: "async suggestions, keyboard nav", el: <M04 /> },
  { path: "m05", title: "m05 · Data table (sort + filter)", topic: "column sort, search", el: <M05 /> },
  { path: "m06", title: "m06 · Stopwatch", topic: "useRef interval, start/stop/reset", el: <M06 /> },
  { path: "m07", title: "m07 · Progress stepper", topic: "step progress %", el: <M07 /> },
  { path: "m08", title: "m08 · Pagination component", topic: "reusable windowed pages", el: <M08 /> },
  { path: "m09", title: "m09 · Nested comments (tree)", topic: "recursive render, collapse", el: <M09 /> },
  { path: "m10", title: "m10 · [TS] Tabs", topic: "typed props/state", el: <M10 /> },
  { path: "m11", title: "m11 · [TS] useFetch hook", topic: "generics", el: <M11 /> },
  { path: "m12", title: "m12 · [TS] Star rating", topic: "typed props", el: <M12 /> },
];

function Menu() {
  return (
    <div className="app-shell">
      <h1>Pack 04 — Components Practice</h1>
      <p>Build each component so its tests pass. Read each module's <code>PROMPT.md</code>.</p>
      <ul className="module-menu">
        {MODULES.map((m) => (
          <li key={m.path}>
            <a href={`/${m.path}`}>
              {m.title}
              <small>{m.topic}</small>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const path = window.location.pathname;
  const active = MODULES.find(
    (m) => path === `/${m.path}` || path.startsWith(`/${m.path}/`)
  );

  if (!active) return <Menu />;

  return (
    <BrowserRouter basename={`/${active.path}`}>
      <div className="app-shell">
        <a className="back-link" href="/">← All modules</a>
        {active.el}
      </div>
    </BrowserRouter>
  );
}
