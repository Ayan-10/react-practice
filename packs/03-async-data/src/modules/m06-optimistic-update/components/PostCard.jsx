import LikeButton from "./LikeButton.jsx";

// Presentational card for a single post, wrapping the LikeButton feature.
export default function PostCard({ post }) {
  return (
    <div className="sl-card" data-testid="post-card">
      <h3 className="sl-card-title" data-testid="post-title">
        {post.title}
      </h3>
      <p className="sl-card-author">by {post.author}</p>
      <LikeButton
        initialLiked={post.liked}
        initialCount={post.likes}
      />
    </div>
  );
}
