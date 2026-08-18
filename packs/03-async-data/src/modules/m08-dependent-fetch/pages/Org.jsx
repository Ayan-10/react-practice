import { Link } from "react-router-dom";
import MemberCard from "../components/MemberCard.jsx";
import { MEMBERS } from "../data/team.js";

// A second real route so navigation works — the full org chart.
// Proves the app is a full mini-app, not a single screen.
export default function Org() {
  return (
    <section className="td-page" data-testid="org-page">
      <Link to="/" className="td-back" data-testid="back-home">
        ← Back to people
      </Link>
      <h1 className="td-page-title">Org chart</h1>
      <p className="td-page-sub">{MEMBERS.length} members across teams</p>
      <div className="td-grid">
        {MEMBERS.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
