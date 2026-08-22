import { loadCountries } from "../data/countries.js";

/**
 * THE FEATURE TO BUILD — m09 CountryStats reusable data hook.
 *
 * Two exports:
 *   - `useFetch(fn)` (NAMED) — a reusable data-fetching hook returning
 *     { data, loading, error }. Runs fn() on mount and again if fn changes.
 *   - `UserList` (DEFAULT) — consumes useFetch(loadUsers) and renders the list.
 *
 * `loadUsers` is injected as a prop so tests can force success/failure, and
 * defaults to the local offline loader so the mini-app renders real data.
 *
 * REQUIRED data-testids: loading, error, user-list, user-item.
 */
export function useFetch(fn) {
  // TODO: implement using useState + useEffect. On mount (and whenever `fn`
  // changes) set loading, clear error, call fn(), and store the resolved
  // data or the caught error. Guard against setting state after unmount.
  return { data: null, loading: false, error: null };
}

export default function UserList({ loadUsers = loadCountries }) {
  const { data, loading, error } = useFetch(loadUsers);

  if (loading) return <p data-testid="loading">Loading…</p>;
  if (error) return <p data-testid="error">Failed to load countries</p>;

  return (
    <div className="cs-listing">
      <h2 className="cs-feature-title">Countries</h2>
      <div data-testid="user-list" className="cs-grid">
        {(data || []).map((c) => (
          <div key={c.id} className="cs-card" data-testid="user-item">
            <h3 className="cs-card-title">{c.name}</h3>
            {c.capital ? <p className="cs-card-meta">{c.capital}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
