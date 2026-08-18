// Presentational card for a single blog post.
export default function PostCard({ post }) {
  return (
    <article className="bl-card" data-testid="product-item">
      <h3 className="bl-card-title">{post.title}</h3>
      {post.excerpt ? <p className="bl-card-excerpt">{post.excerpt}</p> : null}
    </article>
  );
}
