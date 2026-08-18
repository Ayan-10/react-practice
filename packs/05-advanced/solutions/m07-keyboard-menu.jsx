// SOLUTION — m07 QuickCmd keyboard menu (roving-focus listbox).
// Copy this over components/Menu.jsx to self-check.
import { useRef, useState, useEffect } from "react";
import { COMMANDS } from "../data/commands.js";

export function nextIndex(key, current, length) {
  switch (key) {
    case "ArrowDown":
      return (current + 1) % length;
    case "ArrowUp":
      return (current - 1 + length) % length;
    case "Home":
      return 0;
    case "End":
      return length - 1;
    default:
      return current;
  }
}

export default function Menu() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (open && listRef.current) listRef.current.focus();
  }, [open]);

  function openMenu() {
    setActiveIndex(0);
    setOpen(true);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      setSelected(COMMANDS[activeIndex].label);
      setOpen(false);
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
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
