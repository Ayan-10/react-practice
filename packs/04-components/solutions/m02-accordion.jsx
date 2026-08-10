// SOLUTION — m02 Accordion.
import { useState } from "react";

const DEFAULT_ITEMS = [
  { id: "s1", title: "Section 1", body: "Body 1" },
  { id: "s2", title: "Section 2", body: "Body 2" },
  { id: "s3", title: "Section 3", body: "Body 3" },
];

export default function Accordion({ items = DEFAULT_ITEMS, multi = false }) {
  const [open, setOpen] = useState(() => new Set());

  function toggle(id) {
    setOpen((prev) => {
      const next = new Set(multi ? prev : []);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div>
      <h2>Accordion</h2>
      {items.map((item) => (
        <div key={item.id} className="accordion-item">
          <button data-testid={`header-${item.id}`} onClick={() => toggle(item.id)}>
            {item.title}
          </button>
          {open.has(item.id) && (
            <div data-testid={`panel-${item.id}`} className="panel">
              {item.body}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
