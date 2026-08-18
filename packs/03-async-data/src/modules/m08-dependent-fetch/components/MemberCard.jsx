// Presentational card for a single team member. Kept dumb on purpose.
export default function MemberCard({ member }) {
  return (
    <div className="td-card" data-testid="member-card">
      <h3 className="td-card-title" data-testid="member-name">
        {member.name}
      </h3>
      <p className="td-card-team">{member.team}</p>
    </div>
  );
}
