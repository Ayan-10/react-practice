import { Link } from "react-router-dom";
import { SESSIONS, totalMinutes } from "../data/sessions.js";

// A second route so navigation is real. Shows the full log of past focus
// sessions plus a small derived total.
export default function History() {
  const total = totalMinutes(SESSIONS);

  return (
    <section className="ft-page" data-testid="history-page">
      <Link to="/" className="ft-back">← Back to timer</Link>
      <h1 className="ft-page-title">Session history</h1>
      <p className="ft-page-sub">
        {SESSIONS.length} sessions · {total} focused minutes
      </p>

      <table className="ft-history-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Tag</th>
            <th>Date</th>
            <th>Minutes</th>
          </tr>
        </thead>
        <tbody>
          {SESSIONS.map((s) => (
            <tr key={s.id} data-testid="history-row">
              <td>{s.task}</td>
              <td><span className="ft-tag">{s.tag}</span></td>
              <td>{s.date}</td>
              <td>{s.minutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
