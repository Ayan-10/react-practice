import { useState } from "react";
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

  // TODO: whenever `open`/`query` change, call getSuggestions(query.trim())
  // (skip when empty) and store the results, resetting `highlight` to 0.
  // Use an `active` cleanup flag to ignore stale responses.

  function select(value) {
    setQuery(value);
    setOpen(false);
    setOptions([]);
  }

  function onChange(e) {
    setQuery(e.target.value);
    setOpen(true);
  }

  // TODO: on ArrowDown/ArrowUp move `highlight` within bounds; on Enter call
  // select(options[highlight]). No-op when the list is closed/empty.
  function onKeyDown() {}

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
