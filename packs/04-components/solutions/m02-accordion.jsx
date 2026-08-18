// SOLUTION — m02 FaqPage accordion.
// Copy this over components/Accordion.jsx to self-check.
import { useState } from "react";
import { FAQ_ITEMS } from "../data/faqs.js";

/**
 * THE FEATURE — m02 FaqPage accordion.
 *
 * `items` defaults to the local offline dataset so the feature renders on its
 * own. `multi` = false: only one open at a time. true: independent toggles.
 *
 * REQUIRED data-testids: header-<id> (per item), panel-<id> (open panels).
 */
export default function Accordion({ items = FAQ_ITEMS, multi = false }) {
  const [openIds, setOpenIds] = useState(() => new Set());

  function toggle(id) {
    setOpenIds((prev) => {
      const next = new Set(multi ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div>
      <h2>Accordion</h2>
      {items.map((item) => (
        <div key={item.id} className="fq-accordion-item">
          <button
            className="fq-accordion-header"
            data-testid={`header-${item.id}`}
            onClick={() => toggle(item.id)}
          >
            {item.title}
          </button>
          {openIds.has(item.id) && (
            <div data-testid={`panel-${item.id}`} className="fq-accordion-panel">
              {item.body}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
