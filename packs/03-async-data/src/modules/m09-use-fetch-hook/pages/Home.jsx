import UserList from "../components/UserList.jsx";
import { COUNTRIES } from "../data/countries.js";

export default function Home() {
  return (
    <section className="cs-page" data-testid="home-page">
      <h1 className="cs-page-title">Country stats</h1>
      <p className="cs-page-sub">{COUNTRIES.length} countries indexed</p>
      {/* The feature under construction lives here (uses its default loader). */}
      <UserList />
    </section>
  );
}
