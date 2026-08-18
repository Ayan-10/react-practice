import { SUBSCRIBERS } from "../data/subscribers.js";

export default function Subscribers() {
  return (
    <div className="ns-subscribers" data-testid="subscribers-page">
      <h1 className="ns-page-title">Subscribers</h1>
      <p className="ns-page-sub">
        People who get The Dispatch each week.
      </p>

      <table className="ns-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Plan</th>
          </tr>
        </thead>
        <tbody>
          {SUBSCRIBERS.map((s) => (
            <tr key={s.id}>
              <td>{s.email}</td>
              <td>{s.plan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
