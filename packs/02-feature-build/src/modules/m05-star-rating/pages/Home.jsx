import { useState } from "react";
import MovieCard from "../components/MovieCard.jsx";
import StarRating from "../components/StarRating.jsx";
import { FEATURED, MOVIES } from "../data/movies.js";

export default function Home() {
  const [lastRating, setLastRating] = useState(0);

  return (
    <section className="mr-page" data-testid="home-page">
      <h1 className="mr-page-title">Rate a movie</h1>
      <p className="mr-page-sub">{MOVIES.length} movies in your library</p>

      <div className="mr-featured">
        <MovieCard movie={FEATURED} />
        {/* The feature under construction lives here. */}
        <StarRating onChange={setLastRating} />
      </div>

      <p className="mr-page-hint" data-testid="last-rating">
        {lastRating > 0
          ? `You gave "${FEATURED.title}" ${lastRating}/5.`
          : "Click a star to rate."}
      </p>
    </section>
  );
}
