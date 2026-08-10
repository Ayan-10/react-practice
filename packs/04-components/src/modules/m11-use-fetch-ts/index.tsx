import { useEffect, useState } from "react";

export type User = { id: number; name: string };

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

/**
 * MODULE m11 — [TS] useFetch generic hook. Read PROMPT.md.
 */
export function useFetch<T>(fn: () => Promise<T>): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // TODO: run fn() on mount / when fn changes; manage data/loading/error;
  //       ignore results after unmount.

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

  // TODO: render loading / error / list of user-item.

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
