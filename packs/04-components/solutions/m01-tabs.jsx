// SOLUTION — m01 Tabs.
import { useState } from "react";

const DEFAULT_TABS = [
  { id: "home", label: "Home", content: "Welcome home" },
  { id: "profile", label: "Profile", content: "Your profile" },
  { id: "settings", label: "Settings", content: "Settings panel" },
];

export default function Tabs({ tabs = DEFAULT_TABS }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const activeTab = tabs.find((t) => t.id === active);

  return (
    <div>
      <h2>Tabs</h2>
      <div className="tab-strip">
        {tabs.map((t) => (
          <button
            key={t.id}
            data-testid={`tab-${t.id}`}
            className={`tab${t.id === active ? " active" : ""}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="panel" data-testid="panel">
        {activeTab?.content}
      </div>
    </div>
  );
}
