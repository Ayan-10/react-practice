import PostList from "../components/PostList.jsx";

// Home route — shows the paginated list of posts.
export default function Home() {
  return (
    <section className="bl-home" data-testid="home-page">
      <h1 className="bl-home-title">Latest Posts</h1>
      <PostList />
    </section>
  );
}
