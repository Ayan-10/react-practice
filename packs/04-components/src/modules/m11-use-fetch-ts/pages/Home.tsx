import UserList from "../components/UserList.tsx";
import { USERS } from "../data/users.ts";

export default function Home() {
  return (
    <section className="dl-page" data-testid="home-page">
      <h1 className="dl-page-title">Team directory</h1>
      <p className="dl-page-sub">{USERS.length} people</p>
      {/* The feature under construction lives here (uses its default loader). */}
      <UserList />
    </section>
  );
}
