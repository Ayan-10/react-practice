import { useState } from "react";
import { CONTACTS } from "../data/contacts.js";

/**
 * FEATURE TO BUILD — a client-side search filter over the contacts list.
 *
 * Requirements:
 *   - Case-insensitive substring match on the contact's NAME.
 *   - Show a no-results message (data-testid="no-results") when the filtered
 *     list is empty.
 *
 * Required data-testids:
 *   - search-input
 *   - contact-item (each matching row)
 *   - no-results (only when the filtered list is empty)
 */
export default function ContactList() {
  const [contacts] = useState(CONTACTS);
  const [query, setQuery] = useState("");

  // TODO: filter `contacts` by a case-insensitive substring match of `query`
  // against each contact's name.
  const filtered = contacts;

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
