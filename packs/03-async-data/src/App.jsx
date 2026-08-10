import { Routes, Route, Link } from "react-router-dom";

import M01 from "./modules/m01-fetch-states/index.jsx";
import M02 from "./modules/m02-debounced-search/index.jsx";
import M03 from "./modules/m03-race-condition/index.jsx";
import M04 from "./modules/m04-pagination/index.jsx";
import M05 from "./modules/m05-infinite-scroll/index.jsx";
import M06 from "./modules/m06-optimistic-update/index.jsx";
import M07 from "./modules/m07-retry/index.jsx";
import M08 from "./modules/m08-dependent-fetch/index.jsx";
import M09 from "./modules/m09-use-fetch-hook/index.jsx";
import M10 from "./modules/m10-polling/index.jsx";

const MODULES = [
  { path: "m01", title: "m01 · Fetch states (loading/error/empty/data)", topic: "async lifecycle", el: <M01 /> },
  { path: "m02", title: "m02 · Debounced search", topic: "debounce, cleanup", el: <M02 /> },
  { path: "m03", title: "m03 · Race condition (stale response)", topic: "abort/ignore stale", el: <M03 /> },
  { path: "m04", title: "m04 · Pagination (prev/next)", topic: "paged fetch, offset", el: <M04 /> },
  { path: "m05", title: "m05 · Infinite scroll (load more)", topic: "append, sentinel", el: <M05 /> },
  { path: "m06", title: "m06 · Optimistic update (toggle like)", topic: "optimistic + rollback", el: <M06 /> },
  { path: "m07", title: "m07 · Retry on failure", topic: "error retry", el: <M07 /> },
  { path: "m08", title: "m08 · Dependent fetch (user → posts)", topic: "chained requests", el: <M08 /> },
  { path: "m09", title: "m09 · useFetch custom hook", topic: "reusable data hook", el: <M09 /> },
  { path: "m10", title: "m10 · Polling (auto-refresh)", topic: "interval fetch, cleanup", el: <M10 /> },
];

function Menu() {
  return (
    <div className="app-shell">
      <h1>Pack 03 — Async / Data Practice</h1>
      <p>Implement the async data flow so its tests pass. Read each module's <code>PROMPT.md</code>.</p>
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
