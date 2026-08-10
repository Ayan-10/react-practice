// SOLUTION — m08. preventDefault on submit.
import { useState } from "react";

export default function FormPreventDefault() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // stop native submit / reload
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
