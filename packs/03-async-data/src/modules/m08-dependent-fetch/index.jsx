import { useEffect, useState } from "react";
import { fetchUsers, fetchPostsByUser } from "../../shared/api.js";

/**
 * MODULE m08 — Dependent fetch. Read PROMPT.md.
 *
 * loadUsers() -> [{id,name}]; loadPosts(userId) -> [{id,title}].
 */
export default function DependentFetch({
  loadUsers = fetchUsers,
  loadPosts = fetchPostsByUser,
}) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("");
  const [posts, setPosts] = useState([]);

  // TODO: fetch users on mount.
  // TODO: when `selected` changes and is non-empty, fetch posts for that user.

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

      {/* TODO: show no-selection prompt or posts list */}
      <div data-testid="posts" className="grid" style={{ marginTop: 12 }}>
        {posts.map((p) => (
          <div key={p.id} className="card" data-testid="post-item">
            {p.title}
          </div>
        ))}
      </div>
    </div>
  );
}
