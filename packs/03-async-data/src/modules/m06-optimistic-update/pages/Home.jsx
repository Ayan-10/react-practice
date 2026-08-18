import PostCard from "../components/PostCard.jsx";
import { POSTS } from "../data/posts.js";

export default function Home() {
  return (
    <section className="sl-page" data-testid="home-page">
      <h1 className="sl-page-title">Your feed</h1>
      <p className="sl-page-sub">{POSTS.length} posts</p>
      <div className="sl-grid">
        {POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
