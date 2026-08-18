import ContactList from "../components/ContactList.jsx";
import { CONTACTS } from "../data/contacts.js";

export default function Home() {
  return (
    <section className="ca-page" data-testid="home-page">
      <h1 className="ca-page-title">Your contacts</h1>
      <p className="ca-page-sub">{CONTACTS.length} contacts</p>
      {/* The feature under construction lives here. */}
      <ContactList />
    </section>
  );
}
