import { Link } from "react-router-dom";
import { LIBRARY } from "../data/books.js";

// The "currently reading" is just the first book in the library — enough
// flavour to make the home screen feel like a real reading app.
const CURRENT = LIBRARY[0];

export default function Home() {
  return (
    <section className="ra-page" data-testid="home-page">
      <h1 className="ra-page-title">Welcome back</h1>
      <p className="ra-page-sub">
        Currently reading <strong>{CURRENT.title}</strong> by {CURRENT.author}.
      </p>
      <p className="ra-blurb">
        Use the toggle in the navbar to switch between light and dark reading
        modes. Browse the{" "}
        <Link to="/library" className="ra-inline-link">
          library
        </Link>{" "}
        for more.
      </p>
    </section>
  );
}
