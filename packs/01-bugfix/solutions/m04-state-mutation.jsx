// SOLUTION — m04. Immutable array updates.
import { useState } from "react";

export default function StateMutation() {
  const [tags, setTags] = useState(["react", "hooks"]);
  const [text, setText] = useState("");

  function addTag() {
    if (!text.trim()) return;
    setTags((prev) => [...prev, text.trim()]); // new array
    setText("");
  }

  function removeTag(index) {
    setTags((prev) => prev.filter((_, i) => i !== index)); // new array
  }

  return (
    <div className="card">
      <h2>Tags</h2>
      <input
        data-testid="tag-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a tag"
      />
      <button className="btn" data-testid="add-tag" onClick={addTag}>Add</button>
      <ul data-testid="tag-list">
        {tags.map((tag, i) => (
          <li key={tag + i} data-testid="tag-item">
            {tag}{" "}
            <button data-testid={`remove-${tag}`} onClick={() => removeTag(i)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
