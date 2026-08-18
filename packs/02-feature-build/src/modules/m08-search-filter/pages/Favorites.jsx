import { Link } from "react-router-dom";
import ContactCard from "../components/ContactCard.jsx";
import { CONTACTS } from "../data/contacts.js";

// A second real route so navigation works. (Pretend these are the contacts the
// user starred.) Proves the app is a full mini-app, not a single screen.
const FAVORITES = CONTACTS.slice(0, 2);

export default function Favorites() {
  return (
    <section className="ca-page" data-testid="favorites-page">
      <Link to="/" className="ca-back" data-testid="back-home">
        ← Back to all contacts
      </Link>
      <h1 className="ca-page-title">Favorites</h1>
      <p className="ca-page-sub">{FAVORITES.length} starred</p>
      <div className="ca-grid">
        {FAVORITES.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </section>
  );
}
