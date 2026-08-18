import { useEffect, useState } from "react";
import { loadCommands } from "../data/commands.js";

/**
 * THE FEATURE — m04 CommandPalette autocomplete.
 *
 * `getSuggestions(q)` returns a promise of matching options; it is injected as
 * a prop so tests can supply deterministic data, and defaults to the local
 * offline command loader.
 *
 * Behaviour:
 *   - Typing fetches suggestions and shows them in a list.
 *   - ArrowUp/ArrowDown move the highlight; Enter selects the highlighted one.
 *   - Clicking an option selects it. Selecting fills the input and closes the
 *     list.
 *
 * REQUIRED data-testids: ac-input, ac-list, option-<i>.
 */
export default function Autocomplete({ getSuggestions = loadCommands }) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [highlight, setHighlight] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const q = query.trim();
    if (!q) {
      setOptions([]);
      return;
    }
    let active = true;
    getSuggestions(q).then((list) => {
      if (!active) return;
      setOptions(list);
      setHighlight(0);
    });
    return () => {
      active = false;
    };
  }, [query, open, getSuggestions]);

  function select(value) {
    setQuery(value);
    setOpen(false);
    setOptions([]);
  }

  function onChange(e) {
    setQuery(e.target.value);
    setOpen(true);
  }

  function onKeyDown(e) {
    if (!open || options.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(options.length - 1, h + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(0, h - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(options[highlight]);
    }
  }

  const showList = open && options.length > 0;

  return (
    <div>
      <h2>Autocomplete</h2>
      <input
        className="cp-input"
        data-testid="ac-input"
        value={query}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Type a command..."
      />
      {showList && (
        <ul data-testid="ac-list" className="cp-list">
          {options.map((opt, i) => (
            <li
              key={opt}
              data-testid={`option-${i}`}
              className={i === highlight ? "cp-option highlight" : "cp-option"}
              onClick={() => select(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
