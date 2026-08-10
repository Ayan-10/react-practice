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

/**
 * MODULE m10 — [TS] Tabs. Read PROMPT.md.
 */
export default function Tabs({ tabs = DEFAULT_TABS }: TabsProps) {
  // TODO: track the active tab id (typed string, default = first tab).

  return (
    <div>
      <h2>Tabs (TS)</h2>
      <div className="tab-strip">
        {/* TODO: render tab-<id> buttons with the "active" class */}
      </div>
      <div className="panel" data-testid="panel">
        {/* TODO: render active tab content */}
      </div>
    </div>
  );
}
