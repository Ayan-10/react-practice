// Presentational card for a single contact. Kept dumb on purpose so the
// feature file (ContactList.jsx) only worries about the search filter.
export default function ContactCard({ contact }) {
  return (
    <div className="ca-card" data-testid="contact-card">
      <img
        src={contact.avatar}
        alt={contact.name}
        className="ca-card-avatar"
      />
      <div className="ca-card-body">
        <h3 className="ca-card-name" data-testid="contact-name">
          {contact.name}
        </h3>
        <p className="ca-card-phone">{contact.phone}</p>
        <p className="ca-card-email">{contact.email}</p>
      </div>
    </div>
  );
}
