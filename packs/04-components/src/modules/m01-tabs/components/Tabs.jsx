// TODO: implement DocsViewer tabs behavior — see PROMPT.md
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
  // TODO: track the active tab id with state (default to the first tab).

  return (
    <div>
      <h2>Tabs</h2>
      <div className="dv-tab-strip">
        {tabs.map((t) => (
          <button
            key={t.id}
            data-testid={`tab-${t.id}`}
            className="dv-tab"
            onClick={() => {
              // TODO: set the active tab id on click.
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="dv-panel" data-testid="panel">
        {/* TODO: render only the active tab's content here. */}
      </div>
    </div>
  );
}
