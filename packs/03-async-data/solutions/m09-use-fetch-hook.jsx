// SOLUTION — m09 CountryStats reusable useFetch hook + UserList.
// Copy this over components/UserList.jsx to self-check.
import { useEffect, useState } from "react";
import { loadCountries } from "../data/countries.js";

export function useFetch(fn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    fn()
      .then((result) => {
        if (alive) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (alive) {
          setError(err);
          setLoading(false);
        }
      });
    return () => {
      alive = false;
    };
  }, [fn]);

  return { data, loading, error };
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
