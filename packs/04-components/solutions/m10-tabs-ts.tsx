// SOLUTION — m10 [TS] Tabs.
import { useState, type ReactNode } from "react";

export type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

const DEFAULT_TABS: Tab[] = [
  { id: "home", label: "Home", content: "Welcome home" },
  { id: "profile", label: "Profile", content: "Your profile" },
];

type TabsProps = {
  tabs?: Tab[];
};

export default function Tabs({ tabs = DEFAULT_TABS }: TabsProps) {
  const [active, setActive] = useState<string>(tabs[0]?.id ?? "");
  const activeTab = tabs.find((t) => t.id === active);

  return (
    <div>
      <h2>Tabs (TS)</h2>
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
