import { useState } from "react";

const DEFAULT_ITEMS = [
  { id: "s1", title: "Section 1", body: "Body 1" },
  { id: "s2", title: "Section 2", body: "Body 2" },
  { id: "s3", title: "Section 3", body: "Body 3" },
];

/**
 * MODULE m02 — Accordion. Read PROMPT.md.
 *
 * `multi` = false: only one open at a time. true: independent toggles.
 */
export default function Accordion({ items = DEFAULT_ITEMS, multi = false }) {
  // TODO: track which panel(s) are open (id-or-null for single, Set for multi).

  return (
    <div>
      <h2>Accordion</h2>
      {items.map((item) => (
        <div key={item.id} className="accordion-item">
          <button data-testid={`header-${item.id}`}>{item.title}</button>
          {/* TODO: render panel-<id> only when this item is open */}
        </div>
      ))}
    </div>
  );
}
