import { Link } from "react-router-dom";

// About route — static copy plus a link back to the post list.
export default function About() {
  return (
    <section className="bl-about" data-testid="about-page">
      <h1 className="bl-about-title">About BlogList</h1>
      <p className="bl-about-body">
        BlogList is a tiny reading list demo built to practice paginated data
        fetching in React. Each page shows two posts and refetches from a
        server-like loader as you move between pages.
      </p>
      <Link to="/" className="bl-back-link" data-testid="about-back">
        Back to posts
      </Link>
    </section>
  );
}
