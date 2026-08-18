import { Link } from "react-router-dom";
import PostCard from "../components/PostCard.jsx";
import { POSTS } from "../data/posts.js";

// A second real route so navigation works. Most-liked posts first.
const TRENDING = [...POSTS].sort((a, b) => b.likes - a.likes).slice(0, 2);

export default function Trending() {
  return (
    <section className="sl-page" data-testid="trending-page">
      <Link to="/" className="sl-back" data-testid="back-home">
        ← Back to feed
      </Link>
      <h1 className="sl-page-title">Trending now</h1>
      <p className="sl-page-sub">{TRENDING.length} hot posts</p>
      <div className="sl-grid">
        {TRENDING.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
