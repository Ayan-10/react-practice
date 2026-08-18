// Presentational card for a single history entry. Kept dumb on purpose.
export default function StatusCard({ entry }) {
  return (
    <div className="sm-card" data-testid="status-card">
      <span className="sm-card-when">{entry.when}</span>
      <span className="sm-card-status" data-testid="status-label">
        {entry.status}
      </span>
    </div>
  );
}
