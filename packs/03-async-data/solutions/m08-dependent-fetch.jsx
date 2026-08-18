// SOLUTION — m08 TeamDirectory dependent fetch (member → projects).
// Copy this over components/DependentFetch.jsx to self-check.
import { useEffect, useState } from "react";
import { loadUsers as defaultLoadUsers, loadPosts as defaultLoadPosts } from "../data/team.js";

export default function DependentFetch({
  loadUsers = defaultLoadUsers,
  loadPosts = defaultLoadPosts,
}) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let alive = true;
    loadUsers().then((list) => {
      if (alive) setUsers(list);
    });
    return () => {
      alive = false;
    };
  }, [loadUsers]);

  useEffect(() => {
    if (!selected) {
      setPosts([]);
      return;
    }
    let alive = true;
    loadPosts(selected).then((list) => {
      if (alive) setPosts(list);
    });
    return () => {
      alive = false;
    };
  }, [selected, loadPosts]);

  return (
    <div className="td-feature">
      <h2 className="td-feature-title">Member projects</h2>
      <select
        className="td-select"
        data-testid="user-select"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">-- pick a member --</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      {!selected ? (
        <p data-testid="no-selection" className="td-hint">
          Pick a user to see their projects.
        </p>
      ) : (
        <div data-testid="posts" className="td-grid">
          {posts.map((p) => (
            <div key={p.id} className="td-card" data-testid="post-item">
              {p.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
