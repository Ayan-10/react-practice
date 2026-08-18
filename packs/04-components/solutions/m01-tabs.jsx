// SOLUTION — m01 DocsViewer tabs.
// Copy this over components/Tabs.jsx to self-check.
import { useState } from "react";
import { DOCS_TABS } from "../data/docs.js";

/**
 * THE FEATURE — m01 DocsViewer tabs.
 *
 * `tabs` defaults to the local offline dataset so the feature renders on its
 * own. Clicking a tab shows only that tab's content; the active tab gets a
 * class containing "active".
 *
 * REQUIRED data-testids: tab-<id> (per tab), panel.
 */
export default function Tabs({ tabs = DOCS_TABS }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);

  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div>
      <h2>Tabs</h2>
      <div className="dv-tab-strip">
        {tabs.map((t) => (
          <button
            key={t.id}
            data-testid={`tab-${t.id}`}
            className={t.id === active?.id ? "dv-tab active" : "dv-tab"}
            onClick={() => setActiveId(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="dv-panel" data-testid="panel">
        {active?.content}
      </div>
    </div>
  );
}
