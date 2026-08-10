// SOLUTION — m04 Autocomplete.
import { useEffect, useRef, useState } from "react";

const FRUITS = ["Apple", "Apricot", "Banana", "Blueberry", "Cherry", "Mango"];
async function defaultSuggestions(q) {
  const s = q.toLowerCase();
  return FRUITS.filter((f) => f.toLowerCase().startsWith(s));
}

export default function Autocomplete({ getSuggestions = defaultSuggestions }) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [highlight, setHighlight] = useState(0);
  const skipFetch = useRef(false); // suppress refetch right after a selection

  useEffect(() => {
    if (skipFetch.current) {
      skipFetch.current = false;
      return;
    }
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
  }, [query, getSuggestions]);

  function select(value) {
    skipFetch.current = true;
    setQuery(value);
    setOptions([]);
  }

  function onKeyDown(e) {
    if (options.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + options.length) % options.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(options[highlight]);
    }
  }

  return (
    <div>
      <h2>Autocomplete</h2>
      <input
        data-testid="ac-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type a fruit..."
      />
      {options.length > 0 && (
        <ul data-testid="ac-list" className="ac-list">
          {options.map((opt, i) => (
            <li
              key={opt}
              data-testid={`option-${i}`}
              className={i === highlight ? "highlight" : ""}
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
