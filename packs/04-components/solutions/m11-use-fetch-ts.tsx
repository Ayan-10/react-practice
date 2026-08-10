// SOLUTION — m11 [TS] useFetch generic hook.
import { useEffect, useState } from "react";

export type User = { id: number; name: string };

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useFetch<T>(fn: () => Promise<T>): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fn()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err : new Error(String(err)));
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

const defaultUsers = async (): Promise<User[]> => [
  { id: 1, name: "Ada" },
  { id: 2, name: "Alan" },
];

type UserListProps = {
  loadUsers?: () => Promise<User[]>;
};

export default function UserList({ loadUsers = defaultUsers }: UserListProps) {
  const { data, loading, error } = useFetch<User[]>(loadUsers);

  if (loading) return <p data-testid="loading">Loading...</p>;
  if (error) return <p data-testid="error">Something went wrong</p>;

  return (
    <div>
      <h2>Users (TS)</h2>
      <div className="grid">
        {(data ?? []).map((u) => (
          <div key={u.id} className="card" data-testid="user-item">
            {u.name}
          </div>
        ))}
      </div>
    </div>
  );
}
