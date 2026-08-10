import { useState } from "react";

/**
 * BUGFIX MODULE m04 — Direct state mutation, no re-render.
 *
 * Typing a tag and clicking "Add" should append it to the list below.
 * Bug: it mutates the existing array with `.push` and passes the SAME array
 * reference to setState, so React bails out and the UI never updates.
 *
 * Fix the add + remove handlers to update state immutably.
 */
export default function StateMutation() {
  const [tags, setTags] = useState(["react", "hooks"]);
  const [text, setText] = useState("");

  function addTag() {
    if (!text.trim()) return;
    // BUG: mutating existing array and reusing the same reference.
    tags.push(text.trim());
    setTags(tags);
    setText("");
  }

  function removeTag(index) {
    // BUG: mutating in place.
    tags.splice(index, 1);
    setTags(tags);
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
