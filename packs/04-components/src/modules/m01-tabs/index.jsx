import { useState } from "react";

const DEFAULT_TABS = [
  { id: "home", label: "Home", content: "Welcome home" },
  { id: "profile", label: "Profile", content: "Your profile" },
  { id: "settings", label: "Settings", content: "Settings panel" },
];

/**
 * MODULE m01 — Tabs. Read PROMPT.md.
 */
export default function Tabs({ tabs = DEFAULT_TABS }) {
  // TODO: track the active tab id (default = first tab).

  return (
    <div>
      <h2>Tabs</h2>
      <div className="tab-strip">
        {/* TODO: render a button per tab with data-testid="tab-<id>" and
            the "active" class on the active one. */}
      </div>
      <div className="panel" data-testid="panel">
        {/* TODO: render the active tab's content */}
      </div>
    </div>
  );
}
