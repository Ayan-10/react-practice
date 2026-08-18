// SOLUTION — m11 DataLoader · [TS] useFetch hook (generics)
// Self-contained copy of components/UserList.tsx (default loader inlined).
import { useEffect, useState } from "react";

export type User = { id: number; name: string };

export type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

/**
 * THE FEATURE TO BUILD — m11 DataLoader generic useFetch hook + consumer.
 *
 * `useFetch<T>(fn)` runs `fn()` on mount / when `fn` changes; it starts with
 * loading true, data null, error null. On success it stores the data and stops
 * loading; on failure it stores the error and stops loading. Results after
 * unmount are ignored (an `alive` flag guards the async setState).
 */
export function useFetch<T>(fn: () => Promise<T>): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    fn()
      .then((result) => {
        if (!alive) return;
        setData(result);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (!alive) return;
        setError(err);
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [fn]);

  return { data, loading, error };
}

const defaultLoadUsers = async (): Promise<User[]> => [
  { id: 1, name: "Ada" },
  { id: 2, name: "Alan" },
  { id: 3, name: "Grace" },
  { id: 4, name: "Linus" },
];

type UserListProps = {
  loadUsers?: () => Promise<User[]>;
};

/**
 * Default export — a typed consumer of `useFetch<User[]>`. Renders exactly one
 * of loading / error / the user list.
 *
 * REQUIRED data-testids: loading, error, user-item (per user).
 */
export default function UserList({
  loadUsers = defaultLoadUsers,
}: UserListProps) {
  const { data, loading, error } = useFetch<User[]>(loadUsers);

  if (loading) return <p data-testid="loading">Loading…</p>;
  if (error) return <p data-testid="error">Failed to load users</p>;

  return (
    <div className="dl-listing">
      <h2 className="dl-feature-title">Users</h2>
      <div className="dl-grid">
        {(data ?? []).map((u) => (
          <div key={u.id} className="dl-card" data-testid="user-item">
            {u.name}
          </div>
        ))}
      </div>
    </div>
  );
}
