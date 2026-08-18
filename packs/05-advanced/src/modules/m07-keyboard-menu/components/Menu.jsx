import { useRef, useState, useEffect } from "react";
import { COMMANDS } from "../data/commands.js";

/**
 * THE FEATURE TO BUILD — m07 QuickCmd keyboard menu: a roving-focus listbox.
 *
 * A button (`menu-btn`) opens a list (`menu-list`, role="listbox"). Options
 * (`option-<i>`, role="option") come from COMMANDS. Track `activeIndex`.
 *
 * Keyboard handling on the list (implement `nextIndex` + wire `onKeyDown`):
 *   - ArrowDown → next option, WRAPPING to 0 after the last.
 *   - ArrowUp   → previous option, WRAPPING to last from 0.
 *   - Home      → first option (index 0).
 *   - End       → last option (index length-1).
 *   - Enter     → select the active option: set `selected` (its label, shown in
 *                 `data-testid="selected"`) and CLOSE the menu.
 *   - Escape    → close the menu WITHOUT selecting.
 *
 * The active option has `aria-selected="true"` and the `km-active` class, and
 * the active index is exposed via `data-testid="active-index"`.
 *
 * `nextIndex(key, current, length)` is a PURE helper returning the new index for
 * the arrow/Home/End keys (or `current` for keys that don't move focus).
 *
 * REQUIRED data-testids:
 *   - menu-btn, menu-list, option-<i> (0-based), active-index, selected
 */
export function nextIndex(key, current, length) {
  // TODO: implement arrow/Home/End movement with wrap-around.
  // ArrowDown → (current + 1) % length ; ArrowUp → (current - 1 + length) % length
  // Home → 0 ; End → length - 1 ; otherwise → current
  return current;
}

export default function Menu() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const listRef = useRef(null);

  // Move DOM focus to the list when it opens (so key events land on it).
  useEffect(() => {
    if (open && listRef.current) listRef.current.focus();
  }, [open]);

  function openMenu() {
    setActiveIndex(0);
    setOpen(true);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      // TODO: select active option (set selected label) and close.
      return;
    }
    if (e.key === "Escape") {
      // TODO: close without selecting.
      return;
    }
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
      e.preventDefault();
      setActiveIndex((i) => nextIndex(e.key, i, COMMANDS.length));
    }
  }

  return (
    <div className="km-menu">
      <button
        type="button"
        className="btn"
        data-testid="menu-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openMenu())}
      >
        Commands ▾
      </button>

      <p className="km-selected-line">
        Selected: <strong data-testid="selected">{selected ?? "none"}</strong>
      </p>

      {open && (
        <ul
          className="km-list"
          data-testid="menu-list"
          role="listbox"
          tabIndex={0}
          ref={listRef}
          aria-activedescendant={`option-${activeIndex}`}
          onKeyDown={handleKeyDown}
        >
          <li className="km-active-index" data-testid="active-index" hidden>
            {activeIndex}
          </li>
          {COMMANDS.map((cmd, i) => {
            const active = i === activeIndex;
            return (
              <li
                key={cmd.id}
                id={`option-${i}`}
                className={`km-option ${active ? "km-active" : ""}`}
                data-testid={`option-${i}`}
                role="option"
                aria-selected={active}
              >
                {cmd.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
