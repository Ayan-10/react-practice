// TODO: implement FaqPage accordion behavior — see PROMPT.md
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
  // TODO: track which panel ids are open (respecting `multi`).

  function toggle(id) {
    // TODO: open/close the panel for `id`.
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
          {/* TODO: render <div data-testid={`panel-${item.id}`}> when open. */}
        </div>
      ))}
    </div>
  );
}
