import { useState } from "react";

const FRUITS = ["Apple", "Apricot", "Banana", "Blueberry", "Cherry", "Mango"];
async function defaultSuggestions(q) {
  const s = q.toLowerCase();
  return FRUITS.filter((f) => f.toLowerCase().startsWith(s));
}

/**
 * MODULE m04 — Autocomplete. Read PROMPT.md.
 */
export default function Autocomplete({ getSuggestions = defaultSuggestions }) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [highlight, setHighlight] = useState(0);

  // TODO: on query change, fetch suggestions (skip empty query).
  // TODO: arrow keys move highlight; Enter selects; clicking selects.

  return (
    <div>
      <h2>Autocomplete</h2>
      <input
        data-testid="ac-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a fruit..."
      />
      {options.length > 0 && (
        <ul data-testid="ac-list" className="ac-list">
          {options.map((opt, i) => (
            <li
              key={opt}
              data-testid={`option-${i}`}
              className={i === highlight ? "highlight" : ""}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
