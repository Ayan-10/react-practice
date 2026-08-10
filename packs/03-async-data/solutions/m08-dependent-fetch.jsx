// SOLUTION — m08 Dependent fetch (user -> posts).
import { useEffect, useState } from "react";
import { fetchUsers, fetchPostsByUser } from "../../shared/api.js";

export default function DependentFetch({
  loadUsers = fetchUsers,
  loadPosts = fetchPostsByUser,
}) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let active = true;
    loadUsers().then((u) => {
      if (active) setUsers(u);
    });
    return () => {
      active = false;
    };
  }, [loadUsers]);

  useEffect(() => {
    if (!selected) {
      setPosts([]);
      return;
    }
    let active = true;
    loadPosts(selected).then((p) => {
      if (active) setPosts(p);
    });
    return () => {
      active = false;
    };
  }, [selected, loadPosts]);

  return (
    <div>
      <h2>User posts</h2>
      <select
        data-testid="user-select"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">-- pick --</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>{u.name}</option>
        ))}
      </select>

      {!selected ? (
        <p data-testid="no-selection">Pick a user</p>
      ) : (
        <div data-testid="posts" className="grid" style={{ marginTop: 12 }}>
          {posts.map((p) => (
            <div key={p.id} className="card" data-testid="post-item">
              {p.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
