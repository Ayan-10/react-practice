import { useState } from "react";

/**
 * BUGFIX MODULE m08 — Form submit reloads the page.
 *
 * Submitting the form should add the item to the list WITHOUT a full page reload
 * (the default form behaviour). Bug: the submit handler doesn't call
 * event.preventDefault(), so the native submit fires.
 *
 * Fix the handler to prevent the default submit and append the item.
 */
export default function FormPreventDefault() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  function handleSubmit(e) {
    // BUG: missing e.preventDefault();
    if (text.trim()) {
      setItems((prev) => [...prev, text.trim()]);
      setText("");
    }
  }

  return (
    <div className="card">
      <h2>Quick list</h2>
      <form data-testid="form" onSubmit={handleSubmit}>
        <input
          data-testid="item-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add item"
        />
        <button type="submit" className="btn" data-testid="submit">Add</button>
      </form>
      <ul data-testid="items">
        {items.map((it, i) => (
          <li key={i} data-testid="item">{it}</li>
        ))}
      </ul>
    </div>
  );
}
