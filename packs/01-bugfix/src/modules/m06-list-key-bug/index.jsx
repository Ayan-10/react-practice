import { useState } from "react";

/**
 * BUGFIX MODULE m06 — Wrong list key causes state to leak between rows.
 *
 * Each row is a controlled input holding a "note" for that person. Using the
 * array index as the `key` means that when you delete a row, React reuses the
 * DOM/state of the wrong row and the notes get associated with the wrong person.
 *
 * Fix the key so each row keeps its own note after deletions.
 * (The people have stable unique ids — use them.)
 */
const INITIAL = [
  { id: "u1", name: "Alice" },
  { id: "u2", name: "Bob" },
  { id: "u3", name: "Carol" },
];

export default function ListKeyBug() {
  const [people, setPeople] = useState(INITIAL);

  function remove(id) {
    setPeople((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="card">
      <h2>People notes</h2>
      <ul>
        {people.map((person, index) => (
          // BUG: using index as key. Use a stable unique id instead.
          <PersonRow key={index} person={person} onRemove={() => remove(person.id)} />
        ))}
      </ul>
    </div>
  );
}

function PersonRow({ person, onRemove }) {
  // Local, uncontrolled-ish state that must stay tied to THIS person.
  const [note, setNote] = useState("");
  return (
    <li data-testid={`row-${person.id}`} style={{ marginBottom: 8 }}>
      <strong data-testid={`name-${person.id}`}>{person.name}</strong>{" "}
      <input
        data-testid={`note-${person.id}`}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="note"
      />{" "}
      <button data-testid={`remove-${person.id}`} onClick={onRemove}>Delete</button>
    </li>
  );
}
