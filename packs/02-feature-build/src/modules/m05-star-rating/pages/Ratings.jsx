import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";
import { MOVIES } from "../data/movies.js";

// A second real route so navigation works. (Pretend these are movies the user
// has already rated.) Proves the app is a full mini-app, not a single screen.
const RATED = MOVIES.slice(0, 3);

export default function Ratings() {
  return (
    <section className="mr-page" data-testid="ratings-page">
      <Link to="/" className="mr-back" data-testid="back-home">
        ← Back to rate
      </Link>
      <h1 className="mr-page-title">My ratings</h1>
      <p className="mr-page-sub">{RATED.length} movies rated</p>
      <div className="mr-grid">
        {RATED.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
