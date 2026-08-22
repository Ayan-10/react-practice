import { useState, type ReactNode } from "react";
import { DEFAULT_TABS } from "../data/tabs.ts";

export type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs?: Tab[];
};

/**
 * THE FEATURE TO BUILD — m10 SettingsTabs typed tabs.
 *
 * A typed tab strip: `tabs` is a `Tab[]` (id/label/content). The active tab id
 * lives in state (typed `string`). Clicking a tab button switches the visible
 * panel; only ONE panel renders at a time and the first tab is active on mount.
 *
 * REQUIRED data-testids: tab-<id> (per tab button), panel.
 */
export default function Tabs({ tabs = DEFAULT_TABS }: TabsProps) {
  const [activeId, setActiveId] = useState<string>(tabs[0]?.id);

  // TODO: derive `active` from `activeId` (falling back to the first tab)
  // and wire the button onClick below to setActiveId(t.id) so clicking
  // switches the visible panel.
  const active = tabs[0];

  return (
    <div className="se-tabs">
      <div className="se-tab-strip">
        {tabs.map((t) => (
          <button
            key={t.id}
            data-testid={`tab-${t.id}`}
            className={t.id === active?.id ? "se-tab active" : "se-tab"}
            onClick={() => setActiveId(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="se-panel" data-testid="panel">
        {active?.content}
      </div>
    </div>
  );
}
