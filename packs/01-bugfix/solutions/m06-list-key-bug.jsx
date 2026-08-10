// SOLUTION — m06. Use a stable unique key (person.id), not the index.
import { useState } from "react";

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
        {people.map((person) => (
          <PersonRow key={person.id} person={person} onRemove={() => remove(person.id)} />
        ))}
      </ul>
    </div>
  );
}

function PersonRow({ person, onRemove }) {
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
