import { BrowserRouter } from "react-router-dom";

import M01 from "./modules/m01-reducer-cart/index.jsx";
import M02 from "./modules/m02-undo-redo/index.jsx";
import M03 from "./modules/m03-memoization/index.jsx";
import M04 from "./modules/m04-drag-drop-reorder/index.jsx";
import M05 from "./modules/m05-state-machine/index.jsx";
import M06 from "./modules/m06-multi-step-form/index.jsx";
import M07 from "./modules/m07-keyboard-menu/index.jsx";
import M08 from "./modules/m08-carousel/index.jsx";
import M09 from "./modules/m09-tooltip-portal/index.jsx";
import M10 from "./modules/m10-custom-hooks/index.jsx";

const MODULES = [
  { path: "m01", title: "m01 · useReducer cart", topic: "reducer + actions, qty/total", el: <M01 /> },
  { path: "m02", title: "m02 · Undo / redo", topic: "reducer history stack", el: <M02 /> },
  { path: "m03", title: "m03 · Memoization (perf)", topic: "useMemo / useCallback / memo", el: <M03 /> },
  { path: "m04", title: "m04 · Drag & drop reorder", topic: "HTML5 DnD list reorder", el: <M04 /> },
  { path: "m05", title: "m05 · State machine", topic: "finite states, traffic light", el: <M05 /> },
  { path: "m06", title: "m06 · Multi-step form", topic: "cross-field validation, async submit", el: <M06 /> },
  { path: "m07", title: "m07 · Keyboard menu", topic: "arrow-key nav, a11y", el: <M07 /> },
  { path: "m08", title: "m08 · Carousel", topic: "next/prev/dots, wrap-around", el: <M08 /> },
  { path: "m09", title: "m09 · Tooltip (portal)", topic: "createPortal, hover/focus", el: <M09 /> },
  { path: "m10", title: "m10 · Custom hooks", topic: "useDebounce/useLocalStorage/…", el: <M10 /> },
];

function Menu() {
  return (
    <div className="app-shell">
      <h1>Pack 05 — Advanced Practice</h1>
      <p>
        Extra machine-coding topics (reducers, perf, DnD, state machines,
        custom hooks). Build each so its tests pass. Read each module's{" "}
        <code>PROMPT.md</code>.
      </p>
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
