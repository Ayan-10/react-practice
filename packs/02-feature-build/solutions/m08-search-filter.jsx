// SOLUTION — m08 ContactsApp search filter. Copy over components/ContactList.jsx to self-check.
import { useState } from "react";
import { CONTACTS } from "../data/contacts.js";

export default function ContactList() {
  const [contacts] = useState(CONTACTS);
  const [query, setQuery] = useState("");

  const q = query.toLowerCase().trim();
  const filtered = contacts.filter((c) => c.name.toLowerCase().includes(q));

  return (
    <div className="ca-feature" data-testid="contact-feature">
      <h2 className="ca-feature-title">Contacts</h2>

      <input
        className="ca-search"
        data-testid="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name…"
      />

      <ul className="ca-list" data-testid="contact-list">
        {filtered.map((c) => (
          <li key={c.id} className="ca-item" data-testid="contact-item">
            {c.name}
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="ca-no-results" data-testid="no-results">
          No contacts found
        </p>
      )}
    </div>
  );
}
