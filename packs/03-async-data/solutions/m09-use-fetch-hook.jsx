// SOLUTION — m09 useFetch custom hook.
import { useEffect, useState } from "react";
import { fetchUsers } from "../../shared/api.js";

export function useFetch(fn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fn()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err) => {
        if (active) setError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [fn]);

  return { data, loading, error };
}

export default function UserList({ loadUsers = fetchUsers }) {
  const { data, loading, error } = useFetch(loadUsers);

  if (loading) return <p data-testid="loading">Loading...</p>;
  if (error) return <p data-testid="error">Something went wrong</p>;

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
