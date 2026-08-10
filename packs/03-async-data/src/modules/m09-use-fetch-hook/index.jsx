import { useEffect, useState } from "react";
import { fetchUsers } from "../../shared/api.js";

/**
 * MODULE m09 — useFetch custom hook. Read PROMPT.md.
 *
 * Implement useFetch(fn) -> { data, loading, error }.
 */
export function useFetch(fn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: run fn() on mount / when fn changes; manage data/loading/error;
  //       ignore results after unmount.

  return { data, loading, error };
}

export default function UserList({ loadUsers = fetchUsers }) {
  const { data, loading, error } = useFetch(loadUsers);

  // TODO: render loading / error / list of user-item.

  return (
    <div>
      <h2>Users</h2>
      <div data-testid="user-list" className="grid">
        {(data || []).map((u) => (
          <div key={u.id} className="card" data-testid="user-item">
            {u.name}
          </div>
        ))}
      </div>
    </div>
  );
}
